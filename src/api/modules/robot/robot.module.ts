import { forwardRef, Module } from '@nestjs/common';
import { RobotsOfCustomersModel } from './model/robots-of-customers.model';
import { CustomerModel } from '../customer/model/customer.model';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RobotsOfCustomersService } from './service/robots-of-customers.service';
import { RobotsOfCustomersResolver } from './resolver/robots-of-customers.resolver';

@Module({
  imports: [
    forwardRef(() => CustomerModel),
    TypeOrmModule.forFeature([RobotsOfCustomersModel]),
  ],
  providers: [RobotsOfCustomersService, RobotsOfCustomersResolver],
  exports: [RobotsOfCustomersService],
})
export class RobotModule {}
