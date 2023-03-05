import { Args, Query, Resolver } from '@nestjs/graphql';
import { StatisticService } from '../service/statistic.service';
import { Inject, UseGuards } from '@nestjs/common';
import { VescStatisticModel } from '../models/ves-statistic.model';
import { StatisticDto } from '../dto/statistic.dto';
import { AccessTokenGuard } from '../../../../core/modules/auth/guards/access-token.guard';

@Resolver()
export class StatisticResolver {
  constructor(@Inject(StatisticService) private service: StatisticService) {}

  @UseGuards(AccessTokenGuard)
  @Query((returns) => VescStatisticModel)
  async getStatisticForSession(
    @Args('session') session: number,
  ): Promise<VescStatisticModel> {
    return await this.service.getVescStatistic(session);
  }

  @UseGuards(AccessTokenGuard)
  @Query((returns) => StatisticDto)
  async getRobotStats(@Args('session') session: number): Promise<StatisticDto> {
    return await this.service.getRobotStatisticForSession(session);
  }
}
