import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import {
  UserLoginInput,
  UserLoginOutput,
  UserModel,
  UserVerifyInput,
} from '../../../../api/modules/user/models/user.model';
import { AuthService } from '../service/auth.service';
import any = jasmine.any;
import { UserDto } from '../../../../api/modules/user/models/user.dto';

@Resolver((of) => UserModel)
export class AuthResolver {
  constructor(private service: AuthService) {}

  // @Mutation((returns) => UserDto)
  // async login(@Args('input') input: UserLoginInput): Promise<UserDto> {
  //   // return this.service.login(input);
  // }
  //
  // @Mutation((returns) => Boolean)
  // async validate(@Args('input') input: UserVerifyInput): Promise<boolean> {
  //   return this.service.validateUser(input);
  // }
}
