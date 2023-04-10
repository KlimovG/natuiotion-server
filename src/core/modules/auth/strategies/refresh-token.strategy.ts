import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import { AuthService } from '../service/auth.service';
import { TokenPayload } from '../service/jwt.service';
import { DateTime } from 'luxon';

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor(
    private readonly configService: ConfigService,
    private auth: AuthService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          let token = null;
          if (request && request.cookies) {
            token = request.cookies['refresh-token'];
          }
          return token;
        },
      ]),
      secretOrKey: configService.get<string>('JWT_REFRESH'),
      passReqToCallback: true,
      ignoreExpiration: true,
    });
  }

  async validate(req: Request, payload: TokenPayload) {
    const refreshToken = req.cookies['refresh-token'];
    const expirationDate = DateTime.fromSeconds(payload.exp);
    const now = DateTime.local();

    if (now > expirationDate) {
      throw new Error('Token expired');
    }

    await this.auth.verifyRefreshToken(payload.sub, refreshToken);

    return { ...payload, refreshToken };
  }
}
