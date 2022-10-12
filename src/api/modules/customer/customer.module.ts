import { forwardRef, Module } from '@nestjs/common';
import { CustomerResolver } from './resolver/customer.resolver';
import { CustomerService } from './service/customer.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerModel } from './model/customer.model';
import { RobotsOfCustomersModule as RobotsModule } from '../robot/robot.module';

@Module({
  imports: [
    forwardRef(() => RobotsModule),
    TypeOrmModule.forFeature([CustomerModel]),
  ],
  providers: [CustomerResolver, CustomerService],
  exports: [CustomerService],
})
export class CustomerModule {}
