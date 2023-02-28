import { RobotModel } from '../models/robot.model';
import { Inject } from '@nestjs/common';
import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { RobotsService } from '../service/robots.service';
import { UserModel } from '../../user/models/user.model';
import { UserService } from '../../user/service/user.service';

@Resolver((of) => RobotModel)
export class RobotsResolver {
  constructor(
    @Inject(RobotsService)
    private robotService: RobotsService,
    @Inject(UserService) private customerService: UserService,
  ) {}

  // @Query((returns) => RobotModel)
  // async getOneRobotWithCustomer(@Args('id') id: number): Promise<RobotModel> {
  //   return await this.robotService.findOne(id);
  // }
  //
  // @Query((returns) => [RobotModel])
  // async getRobotsByCustomer(@Args('id') id: number): Promise<RobotModel[]> {
  //   return await this.robotService.findByCustomer(id);
  // }

  @Query((returns) => [RobotModel])
  async getAllRobotsWithCustomers(): Promise<RobotModel[]> {
    return await this.robotService.findAll();
  }
  //
  // @ResolveField('customer', () => UserModel)
  // async getCustomer(@Parent() robot: RobotModel) {
  //   const { userId } = robot;
  //   return await this.customerService.findOne(userId);
  // }
}
