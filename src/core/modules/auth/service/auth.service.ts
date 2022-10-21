import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserService } from '../../../../api/modules/user/service/user.service';
import { JwtService } from '@nestjs/jwt';
import { Md5 } from 'ts-md5';
import { UserLoginInput } from '../../../../api/modules/user/models/user.model';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findByLoginAndPassword(
      email,
      password,
    );

    if (user && user.password === password) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login({ email, password }: UserLoginInput) {
    const user = await this.usersService.findByLogin({ email, password });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.UNAUTHORIZED);
    }

    if (user.password !== Md5.hashStr(password)) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }

    return this.jwtService.sign({ email, password });
  }
}
