import { Field, ObjectType } from '@nestjs/graphql';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { SessionsModel } from '../../sessions/models/sessions.model';
import { GpsPointModel } from './gps-point.model';
import { ExtractedWeedsModel } from '../../statistic/models/extracted-weeds.model';

@ObjectType()
@Entity('Points_of_paths')
export class PointOfPathsModel {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ name: 'point_number' })
  pointNumber: number;

  @Column({ name: 'session_id' })
  sessionId: number;

  @ManyToOne(() => SessionsModel, (session) => session.id, {
    eager: true,
  })
  @JoinColumn({ name: 'session_id' })
  session: SessionsModel;

  @Column({ name: 'gps_point_id' })
  gpsPointId: number;

  @Field(() => GpsPointModel)
  @OneToOne(() => GpsPointModel, (gps) => gps.id, { eager: true })
  @JoinColumn({ name: 'gps_point_id' })
  gpsPoint: GpsPointModel;

  @Field(() => [ExtractedWeedsModel])
  @OneToMany(() => ExtractedWeedsModel, (weed) => weed.pointPath)
  extractedWeed: ExtractedWeedsModel[];
}
