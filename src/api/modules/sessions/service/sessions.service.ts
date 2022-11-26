import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SessionsModel } from '../models/sessions.model';
import { Repository } from 'typeorm';
import { BaseService } from '../../../../utils/base-models';

@Injectable()
export class SessionsService implements BaseService<SessionsModel> {
  constructor(
    @InjectRepository(SessionsModel)
    private sessionRepo: Repository<SessionsModel>,
  ) {}

  findAll(): Promise<SessionsModel[]> {
    return this.sessionRepo.find();
  }

  findAllByName(robotSerialNumber: string): Promise<SessionsModel[]> {
    return this.sessionRepo.findBy({
      robotSerialNumber: { serial: robotSerialNumber },
    });
  }

  findOne(id: number): Promise<SessionsModel> {
    return this.sessionRepo.findOneBy({ id });
  }
}
