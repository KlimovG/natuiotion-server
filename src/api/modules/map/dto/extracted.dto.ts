import { Field, Float, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ExtractedDto {
  @Field()
  id: number;
  @Field(() => [Float, Float], { nullable: true })
  pointPath: [number, number];
  @Field()
  weedType: string;
  @Field()
  number: number;
}
