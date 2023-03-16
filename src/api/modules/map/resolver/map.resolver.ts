import {
  Args,
  Float,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { Inject, UseGuards } from '@nestjs/common';
import { MapService } from '../service/map.service';
import { FieldModel } from '../models/field.model';
import { AccessTokenGuard } from '../../../../core/modules/auth/guards/access-token.guard';
import { MapDataDto } from '../dto/map-data.dto';

@Resolver(FieldModel)
export class MapResolver {
  constructor(
    @Inject(MapService)
    private service: MapService,
  ) {}

  @UseGuards(AccessTokenGuard)
  @Query(() => MapDataDto, { nullable: true })
  async getMapData(@Args('sessionId') sessionId: number): Promise<MapDataDto> {
    const field = await this.service.getField(sessionId);
    const path = await this.service.getPath(sessionId);
    const extracted = await this.service.getExtractedPoints(sessionId);

    return {
      field,
      path,
      extracted,
    };
  }

  @UseGuards(AccessTokenGuard)
  @ResolveField(() => [[Float]])
  corners(@Parent() field: FieldModel): Promise<number[][]> {
    return this.service.getCorners(field.id);
  }
}
