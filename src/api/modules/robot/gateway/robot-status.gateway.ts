import {
  OnGatewayConnection,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { HttpService } from '@nestjs/axios';
import { catchError, firstValueFrom } from 'rxjs';
import { HttpException, Logger } from '@nestjs/common';
import { AxiosError, AxiosResponse } from 'axios';
import { RobotStatus } from '../models/status.model';
import { DateTime } from 'luxon';

@WebSocketGateway({
  cors: {
    origin: ['http://localhost:4200', /\.natuition\.com$/],
    methods: ['GET', 'POST'],
    credentials: true,
  },
})
export class RobotStatusGateway implements OnGatewayConnection {
  private readonly logger = new Logger('RobotStatusGateway');
  private robotStatusInterval: NodeJS.Timeout;

  constructor(private httpService: HttpService) {}

  handleConnection(client: any, robotName: string): any {
    this.logger.log(`${client} created a connection for robot ${robotName}`);
  }

  @SubscribeMessage('registerRobot')
  async handleRegister(client: any, robotName: string) {
    this.logger.log(`Registered robot ${robotName}`);

    if (this.robotStatusInterval) {
      clearInterval(this.robotStatusInterval);
    }

    this.robotStatusInterval = setInterval(async () => {
      const statusResponse = await this.fetchRobotStatus(robotName);
      await this.emitRobotStatus(client, statusResponse.data);
    }, 10000);
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

  async emitRobotStatus(client: any, robotName: string) {
    const statusResponse = await this.fetchRobotStatus(robotName);

    if (!statusResponse) {
      client.emit(`robotStatus_${robotName}`, RobotStatus.OFF);
      return;
    }

    const lastHeartbeat = DateTime.fromISO(
      statusResponse['heartbeat_timestamp'],
    );
    const now = DateTime.now();
    const dateDiff = now.diff(lastHeartbeat, 'seconds').seconds;

    if (dateDiff > 60) {
      client.emit(`robotStatus_${robotName}`, RobotStatus.OFF);
      return;
    }

    if (statusResponse['robot_synthesis']) {
      const status = statusResponse['robot_synthesis'] as RobotStatus;
      switch (status) {
        case RobotStatus.ACTIVE:
          client.emit(`robotStatus_${robotName}`, RobotStatus.ACTIVE);
          break;
        case RobotStatus.ON:
          client.emit(`robotStatus_${robotName}`, RobotStatus.ON);
          break;
        case RobotStatus.PROBLEM:
          client.emit(`robotStatus_${robotName}`, RobotStatus.PROBLEM);
          break;
        case RobotStatus.LEFT_AREA:
          client.emit(`robotStatus_${robotName}`, RobotStatus.LEFT_AREA);
          break;
        case RobotStatus.OFF:
        default:
          client.emit(`robotStatus_${robotName}`, RobotStatus.OFF);
          break;
      }
    }
  }
}
