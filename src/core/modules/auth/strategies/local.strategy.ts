import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../service/auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly service: AuthService) {
    super({ usernameField: 'email' });
  }

  async validate(email: string, password: string, request: Request) {
    // const { user, tokens } = await this.service.login({ email, password });
    // const req = this.request;
    // req.tokens = tokens;
    //
    // done(null, user, tokens);
  }
}
