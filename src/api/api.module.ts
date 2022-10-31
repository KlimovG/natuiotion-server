import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { RobotsModule } from './modules/robot/robot.module';
import { SessionsModule } from './modules/sessions/sessions.module';
import { StatisticModule } from './modules/statistic/statistic.module';

@Module({
  imports: [UserModule, RobotsModule, SessionsModule, StatisticModule],
  exports: [UserModule, RobotsModule, SessionsModule, StatisticModule],
})
export class ApiModule {}
