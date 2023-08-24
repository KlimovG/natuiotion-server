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
  ) {}

  async findByCustomer(userId: number): Promise<RobotModel[]> {
    return await this.repository.find({
      where: { userId },
    });
  }
}
