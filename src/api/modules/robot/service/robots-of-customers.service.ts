import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RobotsOfCustomersModel } from '../models/robots-of-customers.model';
import { Repository } from 'typeorm';

@Injectable()
export class RobotsOfCustomersService {
  constructor(
    @InjectRepository(RobotsOfCustomersModel)
    private repository: Repository<RobotsOfCustomersModel>,
  ) {}

  // create(input: UserDto): Promise<UserModel> {
  //   return this.repository.save(input);
  // }

  findAll(): Promise<RobotsOfCustomersModel[]> {
    return this.repository.find();
  }

  findOne(id: number): Promise<RobotsOfCustomersModel> {
    return this.repository.findOne({
      where: { id },
    });
  }

  findByCustomer(userId: number): Promise<RobotsOfCustomersModel[]> {
    return this.repository.find({ where: { userId } });
  }
}
