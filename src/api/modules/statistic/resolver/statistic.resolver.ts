import { Args, Query, Resolver } from '@nestjs/graphql';
import { StatisticService } from '../service/statistic.service';
import { Inject } from '@nestjs/common';
import { VescStatisticModel } from '../models/ves-statistic.model';
import { DurationType } from '../../../../utils/date-types';
import { StatisticDto } from '../dto/statistic.dto';

@Resolver()
export class StatisticResolver {
  constructor(@Inject(StatisticService) private service: StatisticService) {}
  @Query((returns) => VescStatisticModel)
  async getStatisticForSession(
    @Args('session') session: number,
  ): Promise<VescStatisticModel> {
    return await this.service.getVescStatistic(session);
  }

  @Query((returns) => StatisticDto)
  async getRobotStats(@Args('session') session: number): Promise<StatisticDto> {
    return await this.service.getRobotStatisticForSession(session);
  }
}
