import { Inject, Injectable } from '@nestjs/common';
import { VescStatisticModel } from '../models/ves-statistic.model';
import { ExtractedWeedsModel } from '../models/extracted-weeds.model';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SessionsService } from '../../sessions/service/sessions.service';
import * as luxon from 'luxon';
import { PointOfPathsModel } from '../../map/models/point-of-paths.model';
import { WeedTypesModel } from '../models/weed-types.model';
import { ChartDataDto } from '../dto/chart-data.dto';
import { StatisticDto } from '../dto/statistic.dto';

@Injectable()
export class StatisticService {
  constructor(
    @InjectRepository(VescStatisticModel)
    private vescRepo: Repository<VescStatisticModel>,
    @InjectRepository(ExtractedWeedsModel)
    private extractedWeedsRepo: Repository<ExtractedWeedsModel>,
    @InjectRepository(WeedTypesModel)
    private weedTypesRepo: Repository<WeedTypesModel>,
    @InjectRepository(PointOfPathsModel)
    private pointsRepo: Repository<PointOfPathsModel>,
    @Inject(SessionsService)
    private sessionsService: SessionsService,
  ) {}

  getVescStatistic(sessionId: number): Promise<VescStatisticModel> {
    return this.vescRepo.findOne({ where: { sessionId } });
  }

  getExtractedWeeds(sessionId: number): Promise<ExtractedWeedsModel[]> {
    return this.extractedWeedsRepo.find({ where: { sessionId } });
  }

  async getRobotStatisticForSession(id: number): Promise<StatisticDto> {
    const { startTime: start, endTime: end } =
      await this.sessionsService.findOne(id);
    const { voltage } = await this.getVescStatistic(id);
    const startTime = luxon.DateTime.fromJSDate(start);
    const endTime = luxon.DateTime.fromJSDate(end);
    const duration = endTime.diff(startTime, ['hours', 'minutes']).toObject();

    const extractedWeeds = await this.getExtractedWeeds(id);
    const chart = this.convertChartData(extractedWeeds);

    console.log(chart);
    const totalNumber = extractedWeeds.length;

    return {
      voltage,
      duration,
      totalNumber,
      chart,
    };
  }

  getPointsOfPaths(session: number): Promise<PointOfPathsModel[]> {
    return this.pointsRepo.findBy({ sessionId: session });
  }

  private convertChartData(extracted: ExtractedWeedsModel[]): ChartDataDto {
    const chartData = extracted.reduce((result, extract) => {
      const {
        weedType: { label },
      } = extract;
      const value = result[label] ? result[label] + 1 : 1;
      return { ...result, [label]: value };
    }, {});

    const labels: string[] = Object.keys(chartData);
    const data: number[] = Object.values(chartData);

    return {
      labels,
      data,
    };
  }
}
