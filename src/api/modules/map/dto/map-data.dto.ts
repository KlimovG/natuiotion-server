import { Field, ObjectType } from '@nestjs/graphql';
import { ExtractedDto } from './extracted.dto';
import { PathDto } from './path.dto';
import { FieldModel } from '../models/field.model';
import { Type } from 'class-transformer';

@ObjectType()
export class MapDataDto {
  @Field(() => [ExtractedDto], { nullable: true })
  @Type(() => ExtractedDto)
  extracted?: ExtractedDto[];

  @Field({ nullable: true })
  path?: PathDto;

  @Field({ nullable: true })
  field?: FieldModel;
}
