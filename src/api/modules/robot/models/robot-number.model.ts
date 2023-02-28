import { Field, ObjectType } from '@nestjs/graphql';
import { Entity, OneToOne, PrimaryColumn } from 'typeorm';
import { RobotModel } from './robot.model';

@ObjectType()
@Entity('Robots')
export class RobotNumberModel {
  @Field()
  @PrimaryColumn({ name: 'serial_number', length: 5, nullable: false })
  serial: string;
}
