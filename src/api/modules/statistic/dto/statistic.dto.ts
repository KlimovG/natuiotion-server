import { Field, ObjectType } from '@nestjs/graphql';
import { ChartDataDto } from './chart-data.dto';

@ObjectType()
export class StatisticDto {
  @Field()
  voltage?: number;

  @Field()
  duration?: string;

  @Field()
  totalNumber: number;

  @Field({ nullable: true })
  chart: ChartDataDto;
}
