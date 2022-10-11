import { RobotsOfCustomersModel } from '../model/robots-of-customers.model';
import { Inject } from '@nestjs/common';
import { Query, Resolver } from '@nestjs/graphql';
import { RobotsOfCustomersService } from '../service/robots-of-customers.service';

@Resolver((of) => RobotsOfCustomersModel)
export class RobotsOfCustomersResolver {
  constructor(
    @Inject(RobotsOfCustomersService) private service: RobotsOfCustomersService,
  ) {}

  @Query((returns) => [RobotsOfCustomersModel])
  async getOneRobotWithCustomer(id: number): Promise<RobotsOfCustomersModel> {
    return await this.service.findOne(id);
  }
  @Query((returns) => [RobotsOfCustomersModel])
  async getAllRobotsWithCustomer(): Promise<RobotsOfCustomersModel[]> {
    return await this.service.findAll();
  }
}
