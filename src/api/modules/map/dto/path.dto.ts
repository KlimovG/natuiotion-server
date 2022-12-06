import { Field, Float, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class PathDto {
  @Field(() => [[Float, Float]])
  path: [number, number][];
}
