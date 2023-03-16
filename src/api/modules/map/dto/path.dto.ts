import { Field, Float, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class PathDto {
  @Field(() => [[Float, Float]], { nullable: true })
  path: [number, number][];
}
