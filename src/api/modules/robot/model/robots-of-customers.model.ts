import { Field, ObjectType } from '@nestjs/graphql';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CustomerModel } from '../../customer/model/customer.model';

@ObjectType()
@Entity('Robots_of_customers')
export class RobotsOfCustomersModel {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ name: 'customer_id' })
  customerId: number;

  @Field((type) => CustomerModel, { nullable: true })
  @ManyToOne((type) => CustomerModel, (customer) => customer.robots, {
    eager: true,
  })
  @JoinColumn({ name: 'customer_id' })
  customer: CustomerModel;

  @Field()
  @Column({ name: 'robot_serial_number' })
  robotSerialNumber: string;
}
