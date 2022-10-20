import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { UserModel } from '../model/user.model';
import { Inject } from '@nestjs/common';
import { UserService } from '../service/user.service';
import { RobotsOfCustomersModel as RobotsModel } from '../../robot/model/robots-of-customers.model';
import { RobotsOfCustomersService as RobotsService } from '../../robot/service/robots-of-customers.service';

@Resolver((of) => UserModel)
export class UserResolver {
  constructor(
    @Inject(UserService) private customerService: UserService,
    private robotsService: RobotsService,
  ) {}

  @Query((returns) => [UserModel])
  async customers(): Promise<UserModel[]> {
    return await this.customerService.findAll();
  }

  @Query((returns) => UserModel)
  async customer(@Args('id') id: number): Promise<UserModel> {
    return await this.customerService.findOne(id);
  }

  @Query((returns) => UserModel)
  async login(
    @Args('email') email: string,
    @Args('password') password: string,
  ): Promise<UserModel> {
    return await this.customerService.findByLogin({ email, password });
  }

  @ResolveField((returns) => [RobotsModel])
  async robots(@Parent() robot: RobotsModel) {
    return this.robotsService.findByCustomer(robot.id);
  }
}
