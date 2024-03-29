import { forwardRef, Module } from '@nestjs/common';
import { RobotModel } from './models/robot.model';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RobotsService } from './service/robots.service';
import { RobotsResolver } from './resolver/robots.resolver';
import { UserModule } from '../user/user.module';
import { RobotNumberModel } from './models/robot-number.model';
import { HttpModule } from '@nestjs/axios';
import { RobotStatusGateway } from './gateway/robot-status.gateway';

@Module({
  imports: [
    forwardRef(() => UserModule),
    HttpModule,
    TypeOrmModule.forFeature([RobotModel, RobotNumberModel]),
  ],
  providers: [RobotsService, RobotsResolver, RobotStatusGateway],
  exports: [RobotsService],
})
export class RobotsModule {}
