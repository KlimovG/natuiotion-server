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
import { PointOfPathsModel } from '../../map/models/point-of-paths.model';

@ObjectType()
@Entity('Extracted_weeds')
export class ExtractedWeedsModel {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ name: 'point_of_path_id' })
  pointPathId: number;

  @Field(() => PointOfPathsModel, { nullable: true })
  @ManyToOne(
    () => PointOfPathsModel,
    (pointOfPaths) => pointOfPaths.extractedWeed,
    { eager: true },
  )
  @JoinColumn({ name: 'point_of_path_id' })
  pointPath: PointOfPathsModel;

  @Field()
  @Column({ name: 'session_id' })
  sessionId: number;

  @Field(() => SessionsModel)
  @ManyToOne(() => SessionsModel, (session) => session.id, { eager: true })
  @JoinColumn({ name: 'session_id' })
  session: SessionsModel;

  @Field(() => WeedTypesModel)
  @OneToOne(() => WeedTypesModel, (weed) => weed.id, { eager: true })
  @JoinColumn({ name: 'weed_type_id' })
  weedType: WeedTypesModel;

  @Field()
  @Column({ name: 'number' })
  number: number;
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
