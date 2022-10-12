import { forwardRef, Module } from '@nestjs/common';
import { UserResolver } from './resolver/user.resolver';
import { UserService } from './service/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModel } from './model/user.model';
import { RobotsOfCustomersModule as RobotsModule } from '../robot/robot.module';

@Module({
  imports: [
    forwardRef(() => RobotsModule),
    TypeOrmModule.forFeature([UserModel]),
  ],
  providers: [UserResolver, UserService],
  exports: [UserService],
})
export class UserModule {}
