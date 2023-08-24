import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RobotModel } from '../models/robot.model';
import { Repository } from 'typeorm';

@Injectable()
export class RobotsService {
  private readonly logger = new Logger('Robot');

  constructor(
    @InjectRepository(RobotModel)
    private repository: Repository<RobotModel>,
  ) {}

  async findByCustomer(userId: number): Promise<RobotModel[]> {
    this.logger.log(`Get robots for user with id:${userId}`);
    return await this.repository.find({
      where: { userId },
    });
  }
}
