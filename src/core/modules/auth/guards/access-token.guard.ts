import { AuthGuard } from '@nestjs/passport';
import { ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { ExecutionContextHost } from '@nestjs/core/helpers/execution-context-host';

export class AccessTokenGuard extends AuthGuard('jwt-access') {
  constructor() {
    super();
  }
  async canActivate(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context).getContext().req;
    return (await super.canActivate(
      new ExecutionContextHost([ctx]),
    )) as boolean;
  }
}
