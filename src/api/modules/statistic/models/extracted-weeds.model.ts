import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { SessionsModel } from '../../sessions/models/sessions.model';
import { WeedTypesModel } from './weed-types.model';

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

  @Field((type) => WeedTypesModel)
  @OneToOne((type) => WeedTypesModel, (weed) => weed.id, { eager: true })
  @JoinColumn({ name: 'weed_type_id' })
  weedType: WeedTypesModel;
}

export enum WeedTypes {
  'Plantain' = 1,
  'Daisy',
  'Porcelle',
  'Dandelion',
}

registerEnumType(WeedTypes, {
  name: 'WeedTypes',
  description: 'The weed types.',
});
