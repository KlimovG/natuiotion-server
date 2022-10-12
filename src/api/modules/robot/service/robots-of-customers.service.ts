import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RobotsOfCustomersModel } from '../model/robots-of-customers.model';
import { Repository } from 'typeorm';

@Injectable()
export class RobotsOfCustomersService {
  constructor(
    @InjectRepository(RobotsOfCustomersModel)
    private repository: Repository<RobotsOfCustomersModel>,
  ) {}

  // create(input: CustomerDto): Promise<CustomerModel> {
  //   return this.repository.save(input);
  // }

  findAll(): Promise<RobotsOfCustomersModel[]> {
    return this.repository.find();
  }

  findOne(id: number): Promise<RobotsOfCustomersModel> {
    return this.repository.findOne({
      where: { id },
      relationLoadStrategy: 'join',
    });
  }

  findByCustomer(id: number): Promise<RobotsOfCustomersModel[]> {
    return this.repository.find({ where: { customerId: id } });
  }
}
