import { Module } from '@nestjs/common';
import { CustomerModule } from './modules/customer/customer.module';
import { RobotsOfCustomersModule } from './modules/robot/robot.module';

@Module({
  imports: [CustomerModule, RobotsOfCustomersModule],
  exports: [CustomerModule, RobotsOfCustomersModule],
})
export class ApiModule {}
