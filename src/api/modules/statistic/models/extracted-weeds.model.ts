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
@Entity('Extracted_weeds')
export class ExtractedWeedsModel {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ name: 'point_of_path_id' })
  pointPath: number;

  @Field()
  @Column({ name: 'session_id' })
  sessionId: number;

  @ManyToOne(() => SessionsModel, (session) => session.id, { eager: true })
  @JoinColumn({ name: 'session_id' })
  session: SessionsModel;

  @Field()
  @Column({ name: 'weed_type_id' })
  weedType: number;
}
