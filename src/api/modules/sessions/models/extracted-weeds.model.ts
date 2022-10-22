import { Field, ObjectType } from '@nestjs/graphql';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { SessionsModel } from './sessions.model';

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
  @ManyToOne(() => SessionsModel, (session) => session.id)
  @JoinColumn({ name: 'session_id' })
  session: number;

  @Field()
  @Column({ name: 'weed_type_id' })
  weedType: number;
}
