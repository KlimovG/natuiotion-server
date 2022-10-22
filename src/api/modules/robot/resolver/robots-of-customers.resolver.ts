import { RobotsOfCustomersModel } from '../models/robots-of-customers.model';
import { Inject } from '@nestjs/common';
import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { RobotsOfCustomersService } from '../service/robots-of-customers.service';
import { UserModel } from '../../user/models/user.model';
import { UserService } from '../../user/service/user.service';

@Resolver((of) => RobotsOfCustomersModel)
export class RobotsOfCustomersResolver {
  constructor(
    @Inject(RobotsOfCustomersService)
    private robotService: RobotsOfCustomersService,
    @Inject(UserService) private customerService: UserService,
  ) {}

  @Query((returns) => RobotsOfCustomersModel)
  async getOneRobotWithCustomer(
    @Args('id') id: number,
  ): Promise<RobotsOfCustomersModel> {
    return await this.robotService.findOne(id);
  }

  @Query((returns) => [RobotsOfCustomersModel])
  async getRobotsByCustomer(
    @Args('id') id: number,
  ): Promise<RobotsOfCustomersModel[]> {
    return await this.robotService.findByCustomer(id);
  }

  @Query((returns) => [RobotsOfCustomersModel])
  async getAllRobotsWithCustomers(): Promise<RobotsOfCustomersModel[]> {
    return await this.robotService.findAll();
  }

  @ResolveField('customer', () => UserModel)
  async getCustomer(@Parent() robot: RobotsOfCustomersModel) {
    const { userId } = robot;
    return await this.customerService.findOne(userId);
  }
}
