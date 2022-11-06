import { forwardRef, Module } from '@nestjs/common';
import { RobotModel } from './models/robot.model';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RobotsService } from './service/robots.service';
import { RobotsResolver } from './resolver/robots.resolver';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    forwardRef(() => UserModule),
    TypeOrmModule.forFeature([RobotModel]),
  ],
  providers: [RobotsService, RobotsResolver],
  exports: [RobotsService],
})
export class RobotsModule {}
