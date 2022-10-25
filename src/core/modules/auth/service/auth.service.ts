import { Injectable } from '@nestjs/common';
import { UserService } from '../../../../api/modules/user/service/user.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';
import { UserDto } from '../../../../api/modules/user/dto/user.dto';

export interface TokenPayload {
  username: string;
  email: string;
  id: number;
}

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async login(user: UserDto, response: Response) {
    const tokenPayload = this.generateTokenPayload(user);

    const expires = new Date();
    expires.setSeconds(
      expires.getSeconds() + this.configService.get('JWT_EXPIRATION'),
    );

    const token = this.jwtService.sign(tokenPayload);

    response.cookie('Authentication', token, {
      httpOnly: true,
      expires,
    });
  }

  private generateTokenPayload(user: UserDto): TokenPayload {
    return { username: user.name, email: user.email, id: user.id };
  }
}
