import { RobotsOfCustomersModel } from '../model/robots-of-customers.model';
import { Inject } from '@nestjs/common';
import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { RobotsOfCustomersService } from '../service/robots-of-customers.service';
import { CustomerModel } from '../../customer/model/customer.model';
import { CustomerService } from '../../customer/service/customer.service';

@Resolver((of) => RobotsOfCustomersModel)
export class RobotsOfCustomersResolver {
  constructor(
    @Inject(RobotsOfCustomersService)
    private robotService: RobotsOfCustomersService,
    @Inject(CustomerService) private customerService: CustomerService,
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

  @ResolveField('customer', () => CustomerModel)
  async getCustomer(@Parent() robot: RobotsOfCustomersModel) {
    const { customerId } = robot;
    return await this.customerService.findOne(customerId);
  }
}
