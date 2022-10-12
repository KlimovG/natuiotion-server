import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { CustomerModel } from '../model/customer.model';
import { Inject } from '@nestjs/common';
import { CustomerService } from '../service/customer.service';
import { RobotsOfCustomersModel as RobotsModel } from '../../robot/model/robots-of-customers.model';
import { RobotsOfCustomersService as RobotsService } from '../../robot/service/robots-of-customers.service';

@Resolver((of) => CustomerModel)
export class CustomerResolver {
  constructor(
    @Inject(CustomerService) private customerService: CustomerService,
    private robotsService: RobotsService,
  ) {}

  @Query((returns) => [CustomerModel])
  async customers(): Promise<CustomerModel[]> {
    return await this.customerService.findAll();
  }

  @Query((returns) => CustomerModel)
  async customer(@Args('id') id: number): Promise<CustomerModel> {
    return await this.customerService.findOne(id);
  }

  @ResolveField((returns) => [RobotsModel])
  async robots(@Parent() robot: RobotsModel) {
    return this.robotsService.findByCustomer(robot.id);
  }
}
