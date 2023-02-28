// import {
//   CanActivate,
//   ExecutionContext,
//   HttpException,
//   HttpStatus,
//   Injectable,
// } from '@nestjs/common';
// import { GqlExecutionContext } from '@nestjs/graphql';
// import { JwtService } from '@nestjs/jwt';
//
// @Injectable()
// export class AccessTokenGuard implements CanActivate {
//   constructor(private jwtService: JwtService) {}
//   async canActivate(context: ExecutionContext) {
//     const ctx = GqlExecutionContext.create(context).getContext();
//     console.log(ctx);
//     if (!ctx.headers.authorization) {
//       return false;
//     }
//
//     ctx.user = await this.validateToken(ctx.headers.authorization);
//
//     return true;
//   }
//
//   async validateToken(auth: string) {
//     if (auth.split(' ')[0] !== 'Bearer') {
//       throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
//     }
//
//     const token = auth.split(' ')[1];
//
//     try {
//       return await this.jwtService.verify(token);
//     } catch (e) {
//       throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
//     }
//   }
// }
