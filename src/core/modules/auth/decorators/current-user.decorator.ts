import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export const getCurrentUserByContext = (context: ExecutionContext) => {
  if (context.getType() === 'http') {
    return context.switchToHttp().getRequest().user;
  }
  const ctx = GqlExecutionContext.create(context);
  const user = ctx.getContext().req.user;
  if (!user) return false;
  return ctx.getContext().req.user;
};

export const GetCurrentUser = createParamDecorator(
  (data: string | undefined, context: ExecutionContext) => {
    if (!data) return getCurrentUserByContext(context);

    if (context.getType() === 'http') {
      return context.switchToHttp().getRequest().user[data];
    }
    const ctx = GqlExecutionContext.create(context);

    return ctx.getContext().req.user[data];
  },
);
