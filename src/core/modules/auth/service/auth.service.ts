import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from '../../../../api/modules/user/service/user.service';
import { JwtService } from '@nestjs/jwt';
import { Md5 } from 'ts-md5';
import {
  UserLoginInput,
  UserModel,
} from '../../../../api/modules/user/models/user.model';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';
import { UserDto } from '../../../../api/modules/user/models/user.dto';

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

  async validateUser({ email, password }: UserLoginInput): Promise<UserModel> {
    const user = await this.usersService.findByLoginAndPassword(
      email,
      password,
    );

    if (!user) {
      throw new HttpException('User not found', HttpStatus.UNAUTHORIZED);
    }

    if (user.password !== Md5.hashStr(password)) {
      throw new UnauthorizedException({ message: 'Invalid credentials' });
    }

    return user;
  }

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
  //
  // async login({ email, password }: UserLoginInput): Promise<UserLoginOutput> {
  //   const user = await this.validateUser({ email, password });
  //   return { token: this.generateToken(user), user };
  // }

  private generateTokenPayload(user: UserDto): TokenPayload {
    return { username: user.name, email: user.email, id: user.id };
  }
}
