import { forwardRef, Module } from '@nestjs/common';
import { RobotModel } from './models/robot.model';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RobotsService } from './service/robots.service';
import { RobotsResolver } from './resolver/robots.resolver';
import { UserModule } from '../user/user.module';
import { RobotNumberModel } from './models/robot-number.model';

@Module({
  imports: [
    forwardRef(() => UserModule),
    TypeOrmModule.forFeature([RobotModel, RobotNumberModel]),
  ],
  providers: [RobotsService, RobotsResolver],
  exports: [RobotsService],
})
export class RobotsModule {}
