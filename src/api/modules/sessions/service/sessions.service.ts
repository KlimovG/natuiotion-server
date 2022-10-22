import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SessionsModel } from '../models/sessions.model';
import { Repository } from 'typeorm';
import { BaseService } from '../../../../utils/base-models';
import { VescStatisticModel } from '../models/ves-statistic.model';

@Injectable()
export class SessionsService implements BaseService<SessionsModel> {
  constructor(
    @InjectRepository(SessionsModel)
    private sessionRepo: Repository<SessionsModel>,
    @InjectRepository(VescStatisticModel)
    private vescRepo: Repository<VescStatisticModel>,
  ) {}

  // create(input: any): Promise<SessionsModel> {
  //   return Promise.resolve(undefined);
  // }

  findAll(): Promise<SessionsModel[]> {
    return this.sessionRepo.find();
  }

  findOne(id: number): Promise<SessionsModel> {
    return this.sessionRepo.findOneBy({ id });
  }

  getVescStatistic(id: number): Promise<VescStatisticModel> {
    return this.vescRepo.findOne({ where: { sessionId: id } });
  }
}
