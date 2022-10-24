import { forwardRef, Module } from '@nestjs/common';
import { UserModule } from '../../../api/modules/user/user.module';
import { AuthService } from './service/auth.service';
import { JwtStrategy } from './utils/jwt.strategy';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthResolver } from './resolver/auth.resolver';
import { ConfigService } from '@nestjs/config';
import { LocalStrategy } from './strategies/local.strategy';

@Module({
  imports: [
    forwardRef(() => UserModule),
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: `${configService.get<number>('JWT_EXPIRATION')}s`,
        },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [AuthService, JwtStrategy, AuthResolver, LocalStrategy],
  exports: [AuthService],
})
export class AuthModule {}
