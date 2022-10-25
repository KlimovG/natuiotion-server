import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserLoginInput } from '../../../../api/modules/user/models/user.model';
import { GqlExecutionContext } from '@nestjs/graphql';

export const getCurrentUserByContext = (
  context: ExecutionContext,
): UserLoginInput => {
  if (context.getType() === 'http') {
    return context.switchToHttp().getRequest().user;
  }
  const ctx = GqlExecutionContext.create(context);
  return ctx.getContext().req.user;
};

export const CurrentUser = createParamDecorator(
  (_data: unknown, context: ExecutionContext) =>
    getCurrentUserByContext(context),
);
