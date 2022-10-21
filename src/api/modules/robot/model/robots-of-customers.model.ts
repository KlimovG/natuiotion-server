import { Field, ObjectType } from '@nestjs/graphql';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserModel } from '../../user/models/user.model';

@ObjectType()
@Entity('Robots_of_customers')
export class RobotsOfCustomersModel {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ name: 'customer_id' })
  userId: number;

  @Field((type) => UserModel, { nullable: true })
  @ManyToOne((type) => UserModel, (user) => user.robots, {
    eager: true,
  })
  @JoinColumn({ name: 'customer_id' })
  user: UserModel;

  @Field()
  @Column({ name: 'robot_serial_number' })
  robotSerialNumber: string;
}
