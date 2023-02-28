import { Field, ObjectType } from '@nestjs/graphql';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { SessionsModel } from '../../sessions/models/sessions.model';

@ObjectType()
@Entity('Vesc_statistics')
export class VescStatisticModel {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => SessionsModel)
  @OneToOne(() => SessionsModel, (session) => session.statistic, {
    eager: true,
  })
  @JoinColumn({ name: 'session_id' })
  sessionModel: SessionsModel;

  @Field()
  @Column({ name: 'session_id' })
  sessionId: number;

  @Field()
  @Column({ type: 'decimal', precision: 2 })
  voltage: number;

  @Field()
  @Column({ type: 'timestamp' })
  timestamp: Date;
}
