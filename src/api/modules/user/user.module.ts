import { forwardRef, Module } from '@nestjs/common';
import { UserResolver } from './resolver/user.resolver';
import { UserService } from './service/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModel } from './models/user.model';
import { RobotsModule as RobotsModule } from '../robot/robot.module';
import { UserMapper } from './service/user.mapper';

@Module({
  imports: [
    forwardRef(() => RobotsModule),
    TypeOrmModule.forFeature([UserModel]),
  ],
  providers: [UserResolver, UserService, UserMapper],
  exports: [UserService, UserMapper],
})
export class UserModule {}
