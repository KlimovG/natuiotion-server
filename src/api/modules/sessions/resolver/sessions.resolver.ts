import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { SessionsService } from '../service/sessions.service';
import { Inject, UseGuards } from '@nestjs/common';
import { SessionsModel } from '../models/sessions.model';
import { VescStatisticModel } from '../../statistic/models/ves-statistic.model';
import { ExtractedWeedsModel } from '../../statistic/models/extracted-weeds.model';
import { StatisticService } from '../../statistic/service/statistic.service';
import { AccessTokenGuard } from '../../../../core/modules/auth/guards/access-token.guard';

@Resolver(() => SessionsModel)
export class SessionsResolver {
  constructor(
    @Inject(SessionsService)
    private service: SessionsService,
    @Inject(StatisticService)
    private serviceStatistic: StatisticService,
  ) {}

  @UseGuards(AccessTokenGuard)
  @Query(() => [SessionsModel])
  async getAllSessions(): Promise<SessionsModel[]> {
    return await this.service.findAll();
  }

  @UseGuards(AccessTokenGuard)
  @Query(() => [SessionsModel])
  async getSessionsForRobot(
    @Args('serial') serial: string,
  ): Promise<SessionsModel[]> {
    return await this.service.findAllByName(serial);
  }

  @UseGuards(AccessTokenGuard)
  @Query(() => String)
  async getLastSessionForRobot(
    @Args('serial') serial: string,
  ): Promise<string> {
    return (await this.service.findLast(serial))?.id.toString();
  }

  @UseGuards(AccessTokenGuard)
  @Query(() => [SessionsModel])
  async getMoreSessionsForRobot(
    @Args('serial') serial: string,
    @Args('sessionId') sessionId: number,
  ): Promise<SessionsModel[]> {
    return await this.service.findAllByNameStartFromSessionWithId(
      serial,
      sessionId,
    );
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
