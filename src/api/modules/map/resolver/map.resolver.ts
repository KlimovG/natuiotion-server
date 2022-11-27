import {Args, Parent, Query, ResolveField, Resolver} from "@nestjs/graphql";
import {Inject} from "@nestjs/common";
import {MapService} from "../service/map.service";
import {FieldModel} from "../models/field.model";
import {FieldCornerModel} from "../models/fields-corners.model";

@Resolver(FieldModel)
export class MapResolver {
    constructor(
        @Inject(MapService)
        private service: MapService,
    ) {}

   @Query(()=> FieldModel)
    async getField(
        @Args('id') id: number
   ): Promise<FieldModel>{
        return await this.service.getField(id)
   }

   @ResolveField(()=> [FieldCornerModel])
    async corners(@Parent() field: FieldModel): Promise<FieldCornerModel[]>{
        return this.service.getCorners(field.id)
   }
}