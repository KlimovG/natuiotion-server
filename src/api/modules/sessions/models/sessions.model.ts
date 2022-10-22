import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';
import { RobotsModel } from '../../robot/model/robots.model';
import { VescStatisticModel } from './ves-statistic.model';

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

  @Field({ nullable: true })
  @Column({ name: 'previous_sessions_id' })
  prevSessionId: number;

  @Field()
  @ManyToOne(() => RobotsModel, (robot) => robot.serialNumber, { eager: true })
  @JoinColumn({ name: 'robot_serial_number' })
  robotSerialNumber: RobotsModel;

  @Field()
  @Column({ name: 'field_id' })
  fieldId: number;

  @Field(() => VescStatisticModel, { nullable: true })
  @OneToOne(() => VescStatisticModel, (vesc) => vesc.session)
  statistic: VescStatisticModel;
}
