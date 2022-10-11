import { forwardRef, Module } from '@nestjs/common';
import { RobotsOfCustomersModel } from './model/robots-of-customers.model';
import { CustomerModel } from '../customer/model/customer.model';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    forwardRef(() => CustomerModel),
    TypeOrmModule.forFeature([RobotsOfCustomersModel]),
  ],
})
export class RobotModule {}
