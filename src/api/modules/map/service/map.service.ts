import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FieldModel } from '../models/field.model';
import { Repository } from 'typeorm';
import { FieldCornerModel } from '../models/fields-corners.model';
import { StatisticService } from '../../statistic/service/statistic.service';
import { PointOfPathsModel } from '../models/point-of-paths.model';
import { SessionsService } from '../../sessions/service/sessions.service';

@Injectable()
export class MapService {
  private readonly logger = new Logger('Map');

  constructor(
    @InjectRepository(FieldModel)
    private fieldRepo: Repository<FieldModel>,
    @InjectRepository(FieldCornerModel)
    private cornerRepo: Repository<FieldCornerModel>,
    @InjectRepository(PointOfPathsModel)
    private pointsRepo: Repository<PointOfPathsModel>,
    private statisticService: StatisticService,
    private sessionsService: SessionsService,
  ) {}

  async getField(id: number): Promise<FieldModel> {
    this.logger.log(`Getting field for session with ID:${id}`);
    const { fieldId } = await this.sessionsService.findOne(id);
    return await this.fieldRepo.findOneBy({ id: fieldId });
  }

  async getPath(sessionId: number) {
    this.logger.log(`Getting path for session ID:${sessionId}`);
    return this.pointsRepo.findBy({ sessionId });
  }

  async getExtractedPoints(sessionId: number) {
    this.logger.log(
      `Getting extracted gps points for session with ID:${sessionId}`,
    );
    return await this.statisticService.getExtractedWeeds(sessionId);
  }

  getCorners(fieldId: number) {
    return this.cornerRepo.findBy({ fieldId });
  }
}
