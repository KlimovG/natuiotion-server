import { HttpException, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RobotModel } from '../models/robot.model';
import { Repository } from 'typeorm';
import { catchError, firstValueFrom } from 'rxjs';
import { AxiosError } from 'axios';
import { RobotStatus } from '../models/status.model';
import { HttpService } from '@nestjs/axios';
import { DateTime } from 'luxon';

@Injectable()
export class RobotsService {
  private readonly logger = new Logger('Robot');

  constructor(
    @InjectRepository(RobotModel)
    private repository: Repository<RobotModel>,
    private readonly httpService: HttpService,
  ) {}

  async findByCustomer(userId: number): Promise<RobotModel[]> {
    const robots = await this.repository.find({
      where: { userId },
    });

    for await (let robot of robots) {
      robot = await this.updateStatusForRobot(robot);
    }

    return robots;
  }

  async updateStatusForRobot(robot: RobotModel): Promise<RobotModel> {
    const robotName = robot.serial;

    const { data } = await firstValueFrom(
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
    if (!data) {
      robot.status = RobotStatus.OFF;
      return robot;
    }

    if (data && data['heartbeat_timestamp']) {
      const lastHeartbeat = DateTime.fromISO(data['heartbeat_timestamp']);
      const now = DateTime.now();
      const dateDiff = now.diff(lastHeartbeat, 'seconds').seconds;
      robot.status = dateDiff > 60 ? RobotStatus.OFF : RobotStatus.ACTIVE;
      return robot;
    }

    if (data && data['robot_synthesis']) {
      const status = data['robot_synthesis'] as RobotStatus;
      switch (status) {
        case RobotStatus.ACTIVE:
          robot.status = RobotStatus.ACTIVE;
          break;
        case RobotStatus.ON:
          robot.status = RobotStatus.ON;
          break;
        case RobotStatus.PROBLEM:
          robot.status = RobotStatus.PROBLEM;
          break;
        case RobotStatus.LEFT_AREA:
          robot.status = RobotStatus.LEFT_AREA;
          break;
        case RobotStatus.OFF:
          robot.status = RobotStatus.OFF;
          break;
        default:
          robot.status = RobotStatus.OFF;
          break;
      }
    }

    // if (data['robot_synthesis'] === 'OFFLINE') {
    // }
    // robot.status = data['robot_synthesis'] as RobotStatus;
    return robot;
  }

  async getRobotWithStatus(serial: string): Promise<RobotModel> {
    const robot = (await this.repository.find({ where: { serial } })).at(0);

    if (!robot) {
      throw new HttpException('Robot was not found', 404);
    }
    return await this.updateStatusForRobot(robot);
  }
}
