import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FieldModel } from '../models/field.model';
import { Repository } from 'typeorm';
import { FieldCornerModel } from '../models/fields-corners.model';
import { StatisticService } from '../../statistic/service/statistic.service';

@Injectable()
export class MapService {
  private readonly logger = new Logger('Map');

  constructor(
    @InjectRepository(FieldModel)
    private fieldRepo: Repository<FieldModel>,
    @InjectRepository(FieldCornerModel)
    private cornerRepo: Repository<FieldCornerModel>,
    private statisticService: StatisticService,
  ) {}

  async getField(id: number): Promise<FieldModel> {
    this.logger.log(`Getting field with ID:${id}`);
    return await this.fieldRepo.findOneBy({ id });
  }

  async getPath(sessionId: number) {}

  async getExtractedPoints(sessionId: number) {
    this.logger.log(
      `Getting extracted gps points for session with ID:${sessionId}`,
    );
    const result = await this.statisticService.getExtractedWeeds(sessionId);
    console.log(result);
    return result;
  }

  async getCorners(fieldId: number) {
    return await this.cornerRepo.findBy({ fieldId });
  }
}
