import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';
import { RobotsModel } from '../../robot/model/robots.model';

@ObjectType()
@Entity('Sessions')
export class SessionsModel {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ type: 'timestamp', name: 'start_time', nullable: false })
  startTime: Date;

  @Field()
  @Column({ type: 'timestamp', name: 'end_time', nullable: false })
  endTime: Date;

  @Field()
  @Column({ name: 'previous_sessions_id' })
  prevSessionId: number;

  @Field()
  @ManyToOne(() => RobotsModel, (robot) => robot.serialNumber)
  @JoinColumn({ name: 'robot_serial_number' })
  robotSerialNumber: RobotsModel;

  @Field()
  @Column({ name: 'field_id' })
  fieldId: number;
}
