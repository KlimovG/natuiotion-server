import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RobotModel } from '../models/robot.model';
import { Repository } from 'typeorm';

@Injectable()
export class RobotsService {
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
