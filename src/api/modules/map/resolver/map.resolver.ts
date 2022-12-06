import {
  Args,
  Float,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { Inject } from '@nestjs/common';
import { MapService } from '../service/map.service';
import { FieldModel } from '../models/field.model';
import { ExtractedDto } from '../dto/extracted.dto';

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

  @Query(() => [ExtractedDto], { nullable: true })
  getExtractedPoints(@Args('sessionId') sessionId: number) {
    return this.service.getExtractedPoints(sessionId);
  }

  @Query(() => [[Float, Float]], { nullable: true })
  async getPath(
    @Args('sessionId') sessionId: number,
  ): Promise<[number, number][]> {
    return await this.service.getPath(sessionId);
  }

  @ResolveField(() => [[Float]])
  corners(@Parent() field: FieldModel): Promise<number[][]> {
    return this.service.getCorners(field.id);
  }
}
