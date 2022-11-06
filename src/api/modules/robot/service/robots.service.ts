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

  // create(input: UserDto): Promise<UserModel> {
  //   return this.repository.save(input);
  // }

  findAll(): Promise<RobotModel[]> {
    return this.repository.find();
  }

  findOne(id: number): Promise<RobotModel> {
    return this.repository.findOne({
      where: { id },
    });
  }

  findByCustomer(userId: number): Promise<RobotModel[]> {
    return this.repository.find({ where: { userId } });
  }
}
