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
import { ExtractedDto } from '../dto/extracted.dto';
import { AccessTokenGuard } from '../../../../core/modules/auth/guards/access-token.guard';
import { MapDataDto } from '../dto/map-data.dto';
import { PathDto } from '../dto/path.dto';

@Resolver(FieldModel)
export class MapResolver {
  constructor(
    @Inject(MapService)
    private service: MapService,
  ) {}
  @UseGuards(AccessTokenGuard)
  @Query(() => FieldModel)
  async getField(@Args('id') id: number): Promise<FieldModel> {
    return await this.service.getField(id);
  }

  @UseGuards(AccessTokenGuard)
  @Query(() => [ExtractedDto], { nullable: true })
  getExtractedPoints(@Args('sessionId') sessionId: number) {
    return this.service.getExtractedPoints(sessionId);
  }

  @UseGuards(AccessTokenGuard)
  @Query(() => [MapDataDto], { nullable: true })
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
  @Query(() => PathDto, { nullable: true })
  async getPath(@Args('sessionId') sessionId: number): Promise<PathDto> {
    return await this.service.getPath(sessionId);
  }

  @UseGuards(AccessTokenGuard)
  @ResolveField(() => [[Float]])
  corners(@Parent() field: FieldModel): Promise<number[][]> {
    return this.service.getCorners(field.id);
  }
}
