import { AuthGuard } from '@nestjs/passport';
import {
  ExecutionContext,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';

export class RefreshGuard extends AuthGuard('jwt-refresh') {
  private readonly logger = new Logger('jwt-refresh');

  constructor() {
    super();
  }

  handleRequest(err, user, info) {
    if (err || !user) {
      this.logger.error(`Authentication error: ${err?.message || info}`);
      throw err || new UnauthorizedException();
    }
    return user;
  }

  async canActivate(context: ExecutionContext) {
    return (await super.canActivate(context)) as boolean;
  }
}
