import { Module } from '@nestjs/common';
import { CustomerModule } from './modules/customer/customer.module';

@Module({
  imports: [CustomerModule],
})
export class ApiModule {}
