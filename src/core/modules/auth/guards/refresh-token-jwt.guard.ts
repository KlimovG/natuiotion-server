import { AuthGuard } from '@nestjs/passport';
import { ExecutionContext } from '@nestjs/common';

export class RefreshGuard extends AuthGuard('jwt-refresh') {
  constructor() {
    super();
  }
  async canActivate(context: ExecutionContext) {
    return (await super.canActivate(context)) as boolean;
  }
}
