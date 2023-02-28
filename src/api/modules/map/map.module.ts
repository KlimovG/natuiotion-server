import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PointOfPathsModel } from './models/point-of-paths.model';
import { FieldCornerModel } from './models/fields-corners.model';
import { FieldModel } from './models/field.model';
import { MapService } from './service/map.service';
import { MapResolver } from './resolver/map.resolver';
import { GpsPointModel } from './models/gps-point.model';
import { StatisticModule } from '../statistic/statistic.module';
import { SessionsModule } from '../sessions/sessions.module';

@Module({
  imports: [
    forwardRef(() => StatisticModule),
    forwardRef(() => SessionsModule),
    TypeOrmModule.forFeature([
      PointOfPathsModel,
      FieldCornerModel,
      FieldModel,
      GpsPointModel,
    ]),
  ],
  providers: [MapService, MapResolver],
})
export class MapModule {}
