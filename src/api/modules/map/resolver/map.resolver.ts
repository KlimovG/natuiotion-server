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
  @Query(() => [[Float, Float]], { nullable: true })
  async getPath(
    @Args('sessionId') sessionId: number,
  ): Promise<[number, number][]> {
    return await this.service.getPath(sessionId);
  }

  @UseGuards(AccessTokenGuard)
  @ResolveField(() => [[Float]])
  corners(@Parent() field: FieldModel): Promise<number[][]> {
    return this.service.getCorners(field.id);
  }
}
