import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CustomerModel } from '../model/customer.model';
import { Repository } from 'typeorm';
import { CustomerDto } from '../dto/customer.dto';

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(CustomerModel)
    private repository: Repository<CustomerModel>,
  ) {}

  create(input: CustomerDto): Promise<CustomerModel> {
    return this.repository.save(input);
  }

  findAll(): Promise<CustomerModel[]> {
    return this.repository.find();
  }

  findOne(id: number): Promise<CustomerModel> {
    return this.repository.findOneBy({ id });
  }
}
