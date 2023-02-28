import { Field, ObjectType } from '@nestjs/graphql';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserModel } from '../../user/models/user.model';

@ObjectType()
@Entity('Robots_of_customers')
export class RobotModel {
  // @Field()
  // @PrimaryGeneratedColumn()
  // id: number;
  //
  // @Field()
  // @Column({ name: 'customer_id', nullable: true })
  // userId: number;

  // @Field((type) => UserModel, { nullable: true })
  // @ManyToOne((type) => UserModel, (user) => user.robots, {
  //   eager: true,
  // })
  // @JoinColumn({ name: 'customer_id' })
  // user: UserModel;

  @Field()
  @PrimaryColumn({ name: 'robot_serial_number' })
  serial: string;
}
