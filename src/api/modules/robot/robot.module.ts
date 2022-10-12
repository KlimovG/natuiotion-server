import { forwardRef, Module } from '@nestjs/common';
import { RobotsOfCustomersModel } from './model/robots-of-customers.model';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RobotsOfCustomersService } from './service/robots-of-customers.service';
import { RobotsOfCustomersResolver } from './resolver/robots-of-customers.resolver';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    forwardRef(() => UserModule),
    TypeOrmModule.forFeature([RobotsOfCustomersModel]),
  ],
  providers: [RobotsOfCustomersService, RobotsOfCustomersResolver],
  exports: [RobotsOfCustomersService],
})
export class RobotsOfCustomersModule {}
