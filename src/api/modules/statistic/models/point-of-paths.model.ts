import { Field, ObjectType } from '@nestjs/graphql';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { SessionsModel } from '../../sessions/models/sessions.model';

@ObjectType()
@Entity('Points_of_paths')
export class PointOfPathsModel {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ name: 'point_number' })
  pointNumber: number;

  @Field()
  @Column({ name: 'session_id' })
  sessionId: number;

  @ManyToOne((type) => SessionsModel, (session) => session.id, {
    eager: true,
  })
  @JoinColumn({ name: 'session_id' })
  session: SessionsModel;

  @Field()
  @Column({ name: 'gps_point_id' })
  gpsPointId: number;
}
