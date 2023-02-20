import { AuthGuard } from '@nestjs/passport';
import { ExecutionContext } from '@nestjs/common';

export class LocalAuthGuard extends AuthGuard('local') {
  async canActivate(context: ExecutionContext) {
    const result = (await super.canActivate(context)) as boolean;
    const request = context.switchToHttp().getRequest();
    console.log('hui');
    if (request.user) {
      // Set tokens to request object
      request.tokens = request.user.tokens;
    }

    return result;
  }
}
