import { HttpException, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RobotModel } from '../models/robot.model';
import { Repository } from 'typeorm';
import { catchError, firstValueFrom } from 'rxjs';
import { AxiosError } from 'axios';
import { RobotStatus } from '../models/status.model';
import { HttpService } from '@nestjs/axios';

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

    for await (const robot of robots) {
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
        continue;
      }
      robot.status = data['robot_synthesis'] as RobotStatus;
    }

    return robots;
  }
}
