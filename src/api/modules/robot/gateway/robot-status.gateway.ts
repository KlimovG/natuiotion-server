import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { HttpService } from '@nestjs/axios';
import { catchError, firstValueFrom } from 'rxjs';
import { HttpException, Logger } from '@nestjs/common';
import { AxiosError, AxiosResponse } from 'axios';
import { RobotStatus } from '../models/status.model';
import { DateTime } from 'luxon';
import { Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: ['http://localhost:4200', /\.natuition\.com$/],
    methods: ['GET', 'POST'],
    credentials: true,
  },
})
export class RobotStatusGateway implements OnGatewayConnection<Socket> {
  private readonly logger = new Logger('RobotStatusGateway');
  private robotStatusInterval: NodeJS.Timeout | null = null;
  private activeRobots: Map<string, Set<string>> = new Map(); // Map of robotName to Set of client IDs

  constructor(private httpService: HttpService) {}

  @WebSocketServer() server;

  handleConnection(client: Socket): void {
    this.logger.log(`Client connected: ${client.id}`);
    if (this.robotStatusInterval === null) {
      this.startSendingRobotStatus();
    }

    client.on('disconnect', () => {
      this.logger.log(`Client disconnected: ${client.id}`);
      // Remove this client from all activeRobots
      for (const [robotName, clients] of this.activeRobots.entries()) {
        clients.delete(client.id);
        if (clients.size === 0) {
          this.activeRobots.delete(robotName);
        }
      }

      if (this.activeRobots.size === 0 && this.robotStatusInterval !== null) {
        clearInterval(this.robotStatusInterval);
        this.robotStatusInterval = null;
      }
    });
  }

  @SubscribeMessage('subscribeRobot')
  async handleSubscribe(
    @MessageBody() robotName: string,
    @ConnectedSocket() client: Socket,
  ): Promise<void> {
    this.logger.log(
      `Subscribe for robot ${robotName} and for client ${client.id}`,
    );
    if (!this.activeRobots.has(robotName)) {
      this.activeRobots.set(robotName, new Set());
    }
    this.activeRobots.get(robotName).add(client.id);
    await this.getStatusForRobot(robotName);
  }

  private startSendingRobotStatus(): void {
    this.robotStatusInterval = setInterval(async () => {
      for (const robotName of this.activeRobots.keys()) {
        await this.getStatusForRobot(robotName);
      }
    }, 10000 * 3);
  }

  async getStatusForRobot(robotName: string) {
    const statusResponse = await this.fetchRobotStatus(robotName);
    this.emitRobotStatus(statusResponse.data, robotName);
  }

  private async fetchRobotStatus(
    robotName: string,
  ): Promise<AxiosResponse<any, any>> {
    return await firstValueFrom(
      this.httpService
        .get(
          `http://172.16.3.5:8080/api/v1/data_gathering/last_robots_status?serial_number=${robotName}`,
        )
        .pipe(
          catchError((error: AxiosError) => {
            this.logger.error(error.response.data);
            throw new HttpException(`Bad response: ${error.message}`, 400);
          }),
        ),
    );
  }

  emitRobotStatus(statusResponse: any, robotName: string) {
    if (!statusResponse) {
      this.server.emit(`robotStatus_${robotName}`, RobotStatus.OFF);
      return;
    }

    const lastHeartbeat = DateTime.fromISO(
      statusResponse['heartbeat_timestamp'],
    );
    const now = DateTime.now();
    const dateDiff = now.diff(lastHeartbeat, 'seconds').seconds;

    if (dateDiff > 120) {
      this.server.emit(`robotStatus_${robotName}`, RobotStatus.OFF);
      return;
    }

    if (statusResponse['robot_synthesis']) {
      const status = statusResponse['robot_synthesis'] as RobotStatus;
      switch (status) {
        case RobotStatus.ACTIVE:
          this.server.emit(`robotStatus_${robotName}`, RobotStatus.ACTIVE);
          break;
        case RobotStatus.ON:
          this.server.emit(`robotStatus_${robotName}`, RobotStatus.ON);
          break;
        case RobotStatus.PROBLEM:
          this.server.emit(`robotStatus_${robotName}`, RobotStatus.PROBLEM);
          break;
        case RobotStatus.LEFT_AREA:
          this.server.emit(`robotStatus_${robotName}`, RobotStatus.LEFT_AREA);
          break;
        case RobotStatus.OFF:
        default:
          this.server.emit(`robotStatus_${robotName}`, RobotStatus.OFF);
          break;
      }
    }
  }
}
