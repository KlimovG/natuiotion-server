import { Injectable } from '@nestjs/common';
import { VescStatisticModel } from '../models/ves-statistic.model';
import { ExtractedWeedsModel } from '../models/extracted-weeds.model';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class StatisticService {
  constructor(
    @InjectRepository(VescStatisticModel)
    private vescRepo: Repository<VescStatisticModel>,
    @InjectRepository(ExtractedWeedsModel)
    private extractedWeedsRepo: Repository<ExtractedWeedsModel>,
  ) {}

  getVescStatistic(id: number): Promise<VescStatisticModel> {
    return this.vescRepo.findOne({ where: { sessionId: id } });
  }

  getExtractedWeeds(id: number): Promise<ExtractedWeedsModel[]> {
    return this.extractedWeedsRepo.find({ where: { sessionId: id } });
  }
}
