import { forwardRef, Module } from '@nestjs/common';
import { RobotsOfCustomersModel } from './model/robots-of-customers.model';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RobotsOfCustomersService } from './service/robots-of-customers.service';
import { RobotsOfCustomersResolver } from './resolver/robots-of-customers.resolver';
import { CustomerModule } from '../customer/customer.module';

@Module({
  imports: [
    forwardRef(() => CustomerModule),
    TypeOrmModule.forFeature([RobotsOfCustomersModel]),
  ],
  providers: [RobotsOfCustomersService, RobotsOfCustomersResolver],
  exports: [RobotsOfCustomersService],
})
export class RobotsOfCustomersModule {}
