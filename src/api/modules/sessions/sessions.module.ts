import { forwardRef, Module } from '@nestjs/common';
import { RobotsModule } from '../robot/robot.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SessionsModel } from './models/sessions.model';

@Module({
  imports: [
    forwardRef(() => RobotsModule),
    TypeOrmModule.forFeature([SessionsModel]),
  ],
})
export class SessionsModule {}
