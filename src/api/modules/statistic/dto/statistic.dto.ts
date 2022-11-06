import { Field, ObjectType } from '@nestjs/graphql';
import { DurationType } from '../../../../utils/date-types';
import { ChartDataDto } from './chart-data.dto';

@ObjectType()
export class StatisticDto {
  @Field()
  voltage?: number;

  @Field()
  duration?: DurationType;

  @Field()
  totalNumber: number;

  @Field({ nullable: true })
  chart: ChartDataDto;
}
