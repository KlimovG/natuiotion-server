import { forwardRef, Module } from '@nestjs/common';
import { CustomerResolver } from './resolver/customer.resolver';
import { CustomerService } from './service/customer.service';
import { RobotsOfCustomersModel as RobotsModel } from '../robot/model/robots-of-customers.model';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerModel } from './model/customer.model';

@Module({
  imports: [
    forwardRef(() => RobotsModel),
    TypeOrmModule.forFeature([CustomerModel]),
  ],
  providers: [CustomerResolver, CustomerService],
  exports: [CustomerService],
})
export class CustomerModule {}
