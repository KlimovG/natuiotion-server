import { AuthGuard } from '@nestjs/passport';
import {
  ExecutionContext,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { ExecutionContextHost } from '@nestjs/core/helpers/execution-context-host';

export class AccessTokenGuard extends AuthGuard('jwt-access') {
  private readonly logger = new Logger('jwt-access');
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
    const ctx = GqlExecutionContext.create(context).getContext().req;
    return (await super.canActivate(
      new ExecutionContextHost([ctx]),
    )) as boolean;
  }
}
