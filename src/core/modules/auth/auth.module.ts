import { Module } from '@nestjs/common';
import { UserModule } from '../../../api/modules/user/user.module';
import { AuthService } from './service/auth.service';
import { JwtStrategy } from './service/jwt.strategy';

@Module({
  imports: [UserModule, JwtStrategy],
  providers: [AuthService],
})
export class AuthModule {}
