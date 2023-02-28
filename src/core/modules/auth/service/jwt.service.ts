import { Injectable } from '@nestjs/common';
import { JwtService as RawJWT } from '@nestjs/jwt/dist/jwt.service';
import { ConfigService } from '@nestjs/config';

export interface TokenPayload {
  sub: number;
  iat?: number;
  exp?: number;
  refreshToken?: string;
}

@Injectable()
export class JwtService {
  constructor(private configService: ConfigService, private jwt: RawJWT) {}

  async getToken(
    userId: number,
    name: string,
    expiration: string,
  ): Promise<string> {
    const payload = this.generateTokenPayload(userId);
    return await this.jwt.signAsync(payload, {
      secret: this.configService.get<string>(name),
      expiresIn: this.configService.get<string>(expiration),
    });
  }

  async getRefreshToken(userId: number): Promise<string> {
    return this.getToken(userId, 'JWT_REFRESH', 'JWT_REFRESH_EXPIRATION');
  }

  async getAccessToken(userId: number): Promise<string> {
    return this.getToken(userId, 'JWT_ACCESS', 'JWT_ACCESS_EXPIRATION');
  }

  async getTokens(
    userId: number,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const [accessToken, refreshToken] = await Promise.all([
      this.getAccessToken(userId),
      this.getRefreshToken(userId),
    ]);

    return { accessToken, refreshToken };
  }

  private generateTokenPayload(id: number): TokenPayload {
    return { sub: id };
  }
}
