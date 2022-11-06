import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';
import { RobotNumberModel } from '../../robot/models/robot-number.model';
import { VescStatisticModel } from '../../statistic/models/ves-statistic.model';
import { ExtractedWeedsModel } from '../../statistic/models/extracted-weeds.model';

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
  @ManyToOne(() => RobotNumberModel, (robot) => robot.serialNumber, {
    eager: true,
  })
  @JoinColumn({ name: 'robot_serial_number' })
  robotSerialNumber: RobotNumberModel;

  @Field(() => [ExtractedWeedsModel], { nullable: true })
  @OneToMany(() => ExtractedWeedsModel, (extracted) => extracted.session)
  extractedWeeds: ExtractedWeedsModel[];

  @Field()
  @Column({ name: 'field_id' })
  fieldId: number;

  @Field(() => VescStatisticModel, { nullable: true })
  @OneToOne(() => VescStatisticModel, (vesc) => vesc.session)
  statistic: VescStatisticModel;
}
