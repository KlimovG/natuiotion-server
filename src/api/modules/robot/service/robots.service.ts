import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RobotModel } from '../models/robot.model';
import { Repository } from 'typeorm';
import { RobotNumberModel } from '../models/robot-number.model';

@Injectable()
export class RobotsService {
  constructor(
    @InjectRepository(RobotNumberModel)
    private repository: Repository<RobotNumberModel>,
  ) {}

  // create(input: UserDto): Promise<UserModel> {
  //   return this.repository.save(input);
  // }

  findAll(): Promise<RobotModel[]> {
    return this.repository.find();
  }

  // findOne(id: number): Promise<RobotModel> {
  //   return this.repository.findOne({
  //     where: { id },
  //   });
  // }
  //
  // findByCustomer(userId: number): Promise<RobotModel[]> {
  //   return this.repository.find({ where: { userId } });
  // }
}
