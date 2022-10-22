import { Field, ObjectType } from '@nestjs/graphql';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { SessionsModel } from './sessions.model';

@ObjectType()
@Entity('Vesc_statistics')
export class VescStatisticModel {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ name: 'sessions_id' })
  sessionId: number;

  @Field(() => SessionsModel)
  @OneToOne(() => SessionsModel, (session) => session.statistic, {
    eager: true,
  })
  @JoinColumn({ name: 'sessions_id' })
  session: SessionsModel;

  @Field()
  @Column({ type: 'decimal', precision: 2 })
  voltage: number;

  @Field()
  @Column({ type: 'timestamp' })
  timestamp: Date;
}
