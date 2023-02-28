import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { SessionsService } from '../service/sessions.service';
import { Inject } from '@nestjs/common';
import { SessionsModel } from '../models/sessions.model';
import { VescStatisticModel } from '../../statistic/models/ves-statistic.model';
import { ExtractedWeedsModel } from '../../statistic/models/extracted-weeds.model';
import { StatisticService } from '../../statistic/service/statistic.service';

@Resolver(() => SessionsModel)
export class SessionsResolver {
  constructor(
    @Inject(SessionsService)
    private service: SessionsService,
    @Inject(StatisticService)
    private serviceStatistic: StatisticService,
  ) {}

  @Query(() => [SessionsModel])
  async getAllSessions(): Promise<SessionsModel[]> {
    return await this.service.findAll();
  }

  @Query(() => [SessionsModel])
  async getSessionsForRobot(
    @Args('serial') serial: string,
  ): Promise<SessionsModel[]> {
    const sessions = await this.service.findAllByName(serial);
    return sessions.map((session) => {
      if (session?.extractedWeeds && session?.extractedWeeds?.length) {
        const extracted = session.extractedWeeds.reduce(
          (acc, value) => acc + value.number,
          0,
        );
        return {
          ...session,
          extracted,
        };
      }
      return session;
    });
  }

  @ResolveField(() => VescStatisticModel)
  async statistic(@Parent() session: SessionsModel) {
    return this.serviceStatistic.getVescStatistic(session.id);
  }

  @ResolveField(() => ExtractedWeedsModel)
  async extractedWeeds(@Parent() session: SessionsModel) {
    return this.serviceStatistic.getExtractedWeeds(session.id);
  }
}
