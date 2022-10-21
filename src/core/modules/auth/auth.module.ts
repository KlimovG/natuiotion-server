import { forwardRef, Module } from '@nestjs/common';
import { UserModule } from '../../../api/modules/user/user.module';
import { AuthService } from './service/auth.service';
import { JwtStrategy } from './utils/jwt.strategy';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { LoginController } from './controllers/login.controller';
import { AuthResolver } from './resolver/auth.resolver';

@Module({
  imports: [
    forwardRef(() => UserModule),
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
    JwtModule.register({
      secret: 'hui',
      signOptions: {
        expiresIn: '60s',
      },
    }),
  ],
  controllers: [LoginController],
  providers: [AuthService, JwtStrategy, AuthResolver],
  exports: [AuthService],
})
export class AuthModule {}
