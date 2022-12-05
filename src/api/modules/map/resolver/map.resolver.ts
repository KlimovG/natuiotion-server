import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { Inject } from '@nestjs/common';
import { MapService } from '../service/map.service';
import { FieldModel } from '../models/field.model';
import { FieldCornerModel } from '../models/fields-corners.model';
import { ExtractedWeedsModel } from '../../statistic/models/extracted-weeds.model';
import { PointOfPathsModel } from '../models/point-of-paths.model';

@Resolver(FieldModel)
export class MapResolver {
  constructor(
    @Inject(MapService)
    private service: MapService,
  ) {}

  @Query(() => FieldModel)
  async getField(@Args('id') id: number): Promise<FieldModel> {
    return await this.service.getField(id);
  }

  @Query(() => [ExtractedWeedsModel])
  async getExtractedPoints(@Args('sessionId') sessionId: number) {
    return await this.service.getExtractedPoints(sessionId);
  }

  @Query(() => [PointOfPathsModel])
  getPath(@Args('sessionId') sessionId: number) {
    return this.service.getPath(sessionId);
  }

  @ResolveField(() => [FieldCornerModel])
  corners(@Parent() field: FieldModel): Promise<FieldCornerModel[]> {
    return this.service.getCorners(field.id);
  }
}
