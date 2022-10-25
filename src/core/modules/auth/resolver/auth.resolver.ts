import { Resolver } from '@nestjs/graphql';
import { UserModel } from '../../../../api/modules/user/models/user.model';
import { AuthService } from '../service/auth.service';

@Resolver((of) => UserModel)
export class AuthResolver {
  constructor(private service: AuthService) {}

  // @UseGuards(LocalAuthGuard)
  // @Mutation((returns) => UserLoginOutput)
  // async login(@Args('input') input: UserLoginInput): Promise<UserLoginOutput> {
  //   return this.service.login(input);
  // }

  // @Mutation((returns) => Boolean)
  // async validate(@Args('input') input: UserVerifyInput): Promise<boolean> {
  //   return this.service.validateUser(input);
  // }
}
