import {Injectable, Logger} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {FieldModel} from "../models/field.model";
import {Repository} from "typeorm";
import {FieldCornerModel} from "../models/fields-corners.model";

@Injectable()
export class MapService {
    private readonly logger = new Logger('Map');

    constructor(
        @InjectRepository(FieldModel)
        private fieldRepo: Repository<FieldModel>,
        @InjectRepository(FieldCornerModel)
        private cornerRepo: Repository<FieldCornerModel>
    ) {}

    async getField(id: number): Promise<FieldModel>{
        this.logger.log(`Getting field with ID:${id}`)
        return await this.fieldRepo.findOneBy({id})
    }


    async getCorners(fieldId: number){
        return await this.cornerRepo.findBy({fieldId})
    }
}
