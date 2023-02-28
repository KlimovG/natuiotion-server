import { Field, ObjectType } from '@nestjs/graphql';
import { ChartDataDto } from './chart-data.dto';

@ObjectType()
export class StatisticDto {
  @Field({ nullable: true })
  voltage?: number;

  @Field({ nullable: true })
  duration?: string;

  @Field({ nullable: true })
  totalNumber: number;

  @Field({ nullable: true })
  chart: ChartDataDto;
}
