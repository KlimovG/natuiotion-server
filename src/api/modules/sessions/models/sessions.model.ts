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
import { VescStatisticModel } from '../../statistic/models/ves-statistic.model';
import { ExtractedWeedsModel } from '../../statistic/models/extracted-weeds.model';
import { RobotModel } from '../../robot/models/robot.model';
import { FieldModel } from '../../map/models/field.model';

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
  @ManyToOne(() => RobotModel, (robot) => robot.serial, {
    eager: true,
  })
  @JoinColumn({ name: 'robot_serial_number' })
  robotSerialNumber: RobotModel;

  @Field()
  @Column({ name: 'robot_serial_number' })
  robotNumber: string;

  @Field(() => [ExtractedWeedsModel], { nullable: true })
  @OneToMany(() => ExtractedWeedsModel, (extracted) => extracted.session)
  extractedWeeds: ExtractedWeedsModel[];

  @Field(() => FieldModel)
  @OneToOne(() => FieldModel, (vesc) => vesc.id, { eager: true })
  @JoinColumn({ name: 'field_id' })
  fieldName: FieldModel;

  @Column({ name: 'field_id' })
  fieldId: number;

  @Field(() => VescStatisticModel, { nullable: true })
  @OneToOne(() => VescStatisticModel, (vesc) => vesc.sessionModel)
  statistic: VescStatisticModel;

  @Field({ nullable: true })
  extracted?: number;
}
