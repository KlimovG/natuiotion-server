import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}
  async canActivate(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context).getContext();

    if (!ctx.headers.authorization) {
      return false;
    }
    console.log(ctx);
    ctx.user = await this.validateToken(ctx.headers.authorization);

    return true;
  }

  async validateToken(auth: string) {
    console.log(auth);
    if (auth.split(' ')[0] !== 'Bearer') {
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    }

    const token = auth.split(' ')[1];
    console.log(token);
    try {
      return await this.jwtService.verify(token);
    } catch (e) {
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    }
  }
}