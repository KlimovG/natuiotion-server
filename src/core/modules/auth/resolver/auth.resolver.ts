import { Args, Query, Resolver } from '@nestjs/graphql';
import {
  UserLoginInput,
  UserModel,
} from '../../../../api/modules/user/models/user.model';
import { AuthService } from '../service/auth.service';

@Resolver((of) => UserModel)
export class AuthResolver {
  constructor(private service: AuthService) {}

  @Query((returns) => String)
  async login(@Args('input') input: UserLoginInput) {
    return this.service.login(input);
  }
}
