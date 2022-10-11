import { Field, ObjectType } from '@nestjs/graphql';
import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { CustomerModel } from '../../customer/model/customer.model';

@ObjectType()
@Entity('Robots_of_customers')
export class RobotsOfCustomersModel {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field((type) => CustomerModel)
  @ManyToOne((type) => CustomerModel, (customer) => customer.robots)
  @JoinColumn({ name: 'customer_id' })
  customer: CustomerModel;
}
