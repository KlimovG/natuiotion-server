import { Field, Float, ObjectType } from '@nestjs/graphql';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { FieldCornerModel } from './fields-corners.model';

@ObjectType()
@Entity('Fields')
export class FieldModel {
  @Field()
  @PrimaryGeneratedColumn({ name: 'id', type: 'int' })
  id: number;

  @Field()
  @Column({ name: 'label', type: 'varchar', length: 255, nullable: true })
  label: string;

  @OneToMany(() => FieldCornerModel, (fieldCorners) => fieldCorners.field)
  cornersModel: FieldCornerModel[];

  @Field(() => [[Float]])
  corners: number[][];
}
