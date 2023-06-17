import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { RobotsModule } from './modules/robot/robot.module';
import { SessionsModule } from './modules/sessions/sessions.module';
import { StatisticModule } from './modules/statistic/statistic.module';
import { MapModule } from './modules/map/map.module';
import { PollsModule } from './modules/polls/polls.module';

@Module({
  imports: [
    UserModule,
    RobotsModule,
    SessionsModule,
    StatisticModule,
    MapModule,
    PollsModule,
  ],
  exports: [
    UserModule,
    RobotsModule,
    SessionsModule,
    StatisticModule,
    MapModule,
    PollsModule,
  ],
})
export class ApiModule {}
