import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ChartDataDto {
  @Field((type) => [String])
  labels: string[];

  @Field((type) => [Number])
  data: number[];
}
