import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserModel } from '../models/user.model';
import { Inject, UseGuards } from '@nestjs/common';
import { UserService } from '../service/user.service';
import { RobotsService as RobotsService } from '../../robot/service/robots.service';
import { GqlAuthGuard } from '../../../../core/modules/auth/guards/gql-auth.guard';
import { GetUserArgs } from '../dto/args/get-user-args.dto';
import { UserDto } from '../dto/user.dto';
import { UserRegistrationInput } from '../dto/input/user-reg-input.dto';

@Resolver((of) => UserModel)
export class UserResolver {
  constructor(
    @Inject(UserService) private customerService: UserService,
    private robotsService: RobotsService,
  ) {}

  @UseGuards(GqlAuthGuard)
  @Query((returns) => [UserModel])
  async customers(): Promise<UserModel[]> {
    return await this.customerService.findAll();
  }

  @UseGuards(GqlAuthGuard)
  @Query((returns) => UserDto)
  async customer(@Args() user: GetUserArgs): Promise<UserDto> {
    return await this.customerService.getUser(user.email);
  }

  @Mutation((returns) => UserModel)
  async createUser(
    @Args('data') data: UserRegistrationInput,
  ): Promise<UserModel> {
    return await this.customerService.create(data);
  }
  //
  // @ResolveField('robots', (returns) => [RobotsModel])
  // async robots(@Parent() robot: RobotsModel) {
  //   return this.robotsService.findByCustomer(robot.id);
  // }
}
