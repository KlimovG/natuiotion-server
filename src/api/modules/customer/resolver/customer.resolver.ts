import { Resolver } from '@nestjs/graphql';
import { CustomerModel } from '../model/customer.model';
import { Inject } from '@nestjs/common';
import { CustomerService } from '../service/customer.service';

@Resolver((of) => CustomerModel)
export class CustomerResolver {
  constructor(
    @Inject(CustomerService) private customerService: CustomerService,
  ) {}
}
