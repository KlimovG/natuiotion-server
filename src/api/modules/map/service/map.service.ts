import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FieldModel } from '../models/field.model';
import { Repository } from 'typeorm';
import { FieldCornerModel } from '../models/fields-corners.model';
import { StatisticService } from '../../statistic/service/statistic.service';
import { PointOfPathsModel } from '../models/point-of-paths.model';
import { SessionsService } from '../../sessions/service/sessions.service';
import { ExtractedDto } from '../dto/extracted.dto';
import { ExtractedWeedsModel } from '../../statistic/models/extracted-weeds.model';
import { PathDto } from '../dto/path.dto';

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
    const field = await this.fieldRepo.findOneBy({ id: fieldId });
    field.label = field.label
      .replace(/[\W_]+(?=-)|\d+(?=%)|%.*?\d+\s?/g, ' ')
      .trim();
    return field;
  }

  async getPath(sessionId: number): Promise<PathDto> {
    this.logger.log(`Getting path for session ID:${sessionId}`);
    const path = await this.pointsRepo.findBy({ sessionId });
    if (path?.length) {
      const result: [number, number][] = path.map((value) => [
        Number(value.gpsPoint.longitude),
        Number(value.gpsPoint.latitude),
      ]);
      return { path: result };
    }
    return null;
  }

  async getExtractedPoints(sessionId: number): Promise<ExtractedDto[]> {
    this.logger.log(
      `Getting extracted gps points for session with ID:${sessionId}`,
    );
    const extracted = await this.statisticService.getExtractedWeeds(sessionId);
    if (extracted) {
      return extracted.map(this.mapExtractedFromServer);
    }
    return null;
  }

  async getCorners(fieldId: number): Promise<number[][]> {
    const corners = await this.cornerRepo.findBy({ fieldId });
    const formatted = corners.map((value) => [
      value.gpsPoint.longitude,
      value.gpsPoint.latitude,
    ]);
    formatted.push(formatted.at(0));
    return formatted;
  }

  private mapExtractedFromServer(value: ExtractedWeedsModel): ExtractedDto {
    return {
      id: value.id,
      weedType: value.weedType.label.replace(/[^a-zA-Z0-9 ]/g, ' ').trim(),
      pointPath: [
        Number(value.pointPath.gpsPoint.longitude),
        Number(value.pointPath.gpsPoint.latitude),
      ],
      number: value.number,
    };
  }
}
