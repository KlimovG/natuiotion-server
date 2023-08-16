import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { RobotStatus } from './status.model';

@ObjectType()
@Entity('Robots_of_customers')
export class RobotModel {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ name: 'customer_id' })
  userId: number;

  @Field()
  @Column({ name: 'robot_serial_number' })
  serial: string;

  @Field(() => RobotStatus, { nullable: true })
  status: RobotStatus;
}
