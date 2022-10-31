import { Module } from '@nestjs/common';
import { StatisticResolver } from './resolver/statistic.resolver';
import { StatisticService } from './service/statistic.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VescStatisticModel } from './models/ves-statistic.model';
import { WeedTypesModel } from './models/weed-types.model';
import { ExtractedWeedsModel } from './models/extracted-weeds.model';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      VescStatisticModel,
      WeedTypesModel,
      ExtractedWeedsModel,
    ]),
  ],
  providers: [StatisticResolver, StatisticService],
  exports: [StatisticService],
})
export class StatisticModule {}
