import { forwardRef, Module } from '@nestjs/common';
import { UserModule } from '../../../api/modules/user/user.module';
import { AuthService } from './service/auth.service';
import { AccessTokenStrategy } from './strategies';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategies';
import { AuthController } from './controllers/auth.controller';
import { RefreshTokenStrategy } from './strategies';
import { JwtService } from './service/jwt.service';

@Module({
  imports: [
    forwardRef(() => UserModule),
    PassportModule.register({
      defaultStrategy: 'jwt-access',
    }),
    JwtModule.register({}),
  ],
  providers: [
    AuthService,
    JwtService,
    AccessTokenStrategy,
    LocalStrategy,
    RefreshTokenStrategy,
  ],
  exports: [AuthService, JwtService],
  controllers: [AuthController],
})
export class AuthModule {}
