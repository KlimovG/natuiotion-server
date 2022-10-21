import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { RobotsModule } from './modules/robot/robot.module';
import { SessionsModule } from './modules/sessions/sessions.module';

@Module({
  imports: [UserModule, RobotsModule, SessionsModule],
  exports: [UserModule, RobotsModule, SessionsModule],
})
export class ApiModule {}
