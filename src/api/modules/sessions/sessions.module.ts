import { forwardRef, Module } from '@nestjs/common';
import { RobotsModule } from '../robot/robot.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SessionsModel } from './models/sessions.model';
import { SessionsResolver } from './resolver/sessions.resolver';
import { SessionsService } from './service/sessions.service';
import { VescStatisticModel } from './models/ves-statistic.model';

@Module({
  imports: [
    forwardRef(() => RobotsModule),
    TypeOrmModule.forFeature([SessionsModel, VescStatisticModel]),
  ],
  providers: [SessionsResolver, SessionsService],
})
export class SessionsModule {}
