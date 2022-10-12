import { Injectable } from '@nestjs/common';
import { UserService } from '../../../../api/modules/user/service/user.service';

@Injectable()
export class AuthService {
  constructor(private usersService: UserService) {}

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
}
