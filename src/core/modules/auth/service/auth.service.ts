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
  UserLoginOutput,
  UserModel,
} from '../../../../api/modules/user/models/user.model';
import { use } from 'passport';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
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

  async login({ email, password }: UserLoginInput): Promise<UserLoginOutput> {
    const user = await this.validateUser({ email, password });
    return { token: this.generateToken(user), user };
  }

  private generateToken({ name, email, id }: UserModel): string {
    const payload = { username: name, email: email, id: id };
    return this.jwtService.sign(payload);
  }
}
