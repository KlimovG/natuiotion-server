import { Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { SessionsService } from '../service/sessions.service';
import { Inject } from '@nestjs/common';
import { SessionsModel } from '../models/sessions.model';
import { VescStatisticModel } from '../models/ves-statistic.model';
import { ExtractedWeedsModel } from '../models/extracted-weeds.model';

@Resolver(() => SessionsModel)
export class SessionsResolver {
  constructor(
    @Inject(SessionsService)
    private service: SessionsService,
  ) {}
  @Query((returns) => [SessionsModel])
  async getAllSessions(): Promise<SessionsModel[]> {
    return await this.service.findAll();
  }

  @ResolveField(() => VescStatisticModel)
  async statistic(@Parent() session: SessionsModel) {
    return this.service.getVescStatistic(session.id);
  }

  @ResolveField(() => ExtractedWeedsModel)
  async extractedWeeds(@Parent() session: SessionsModel) {
    return this.service.getExtractedWeeds(session.id);
  }
}
