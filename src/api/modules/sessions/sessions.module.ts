import { forwardRef, Module } from '@nestjs/common';
import { RobotsModule } from '../robot/robot.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SessionsModel } from './models/sessions.model';
import { SessionsResolver } from './resolver/sessions.resolver';
import { SessionsService } from './service/sessions.service';
import { StatisticModule } from '../statistic/statistic.module';

@Module({
  imports: [
    forwardRef(() => RobotsModule),
    forwardRef(() => StatisticModule),
    TypeOrmModule.forFeature([SessionsModel]),
  ],
  providers: [SessionsResolver, SessionsService],
})
export class SessionsModule {}
