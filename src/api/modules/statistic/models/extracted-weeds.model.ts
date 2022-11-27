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
import {PointOfPathsModel} from "../../map/models/point-of-paths.model";

@ObjectType()
@Entity('Extracted_weeds')
export class ExtractedWeedsModel {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'point_of_path_id' })
  pointPathId: number;

  @Field(()=> PointOfPathsModel)
  @ManyToOne(()=> PointOfPathsModel, (pointOfPaths)=> pointOfPaths.extractedWeed)
  pointPath:PointOfPathsModel

  @Field()
  @Column({ name: 'session_id' })
  sessionId: number;

  @ManyToOne(() => SessionsModel, (session) => session.id, { eager: true })
  @JoinColumn({ name: 'session_id' })
  session: SessionsModel;

  @Field(() => WeedTypesModel)
  @OneToOne(() => WeedTypesModel, (weed) => weed.id, { eager: true })
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
