import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserService } from '../../../../api/modules/user/service/user.service';
import { JwtService } from '@nestjs/jwt';
import { Md5 } from 'ts-md5';
import {
  UserLoginInput,
  UserLoginOutput,
} from '../../../../api/modules/user/models/user.model';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(input: UserLoginOutput): Promise<boolean> {
    // const user = await this.usersService.findByLoginAndPassword(
    //   email,
    //   password,
    // );
    //
    // if (user && user.password === password) {
    //   const { password, ...result } = user;
    //   return result;
    // }
    const { email, token } = input;
    const user = await this.usersService.findByLogin(email);
    try {
      const validToken = this.jwtService.verify(token);
      console.log(validToken);
    } catch (e) {
      console.log(e);
    }
    // if (validToken.email === email) {
    //   return true;
    // }
    return false;
  }

  async login({ email, password }: UserLoginInput): Promise<UserLoginOutput> {
    const user = await this.usersService.findByLoginAndPassword(
      email,
      password,
    );

    if (!user) {
      throw new HttpException('User not found', HttpStatus.UNAUTHORIZED);
    }

    if (user.password !== Md5.hashStr(password)) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }

    return {
      token: this.jwtService.sign({ email, password }),
      email: user.email,
    };
  }
}
