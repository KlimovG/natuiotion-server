import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { RobotsOfCustomersModule } from './modules/robot/robot.module';

@Module({
  imports: [UserModule, RobotsOfCustomersModule],
  exports: [UserModule, RobotsOfCustomersModule],
})
export class ApiModule {}
