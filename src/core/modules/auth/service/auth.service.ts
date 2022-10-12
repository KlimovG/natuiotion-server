import { Injectable } from '@nestjs/common';
import { UserService } from '../../../../api/modules/user/service/user.service';
import { JwtService } from '@nestjs/jwt';
import { UserModel } from '../../../../api/modules/user/model/user.model';

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

  async login({ email, id }: UserModel) {
    const payload = { username: email, sub: id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
