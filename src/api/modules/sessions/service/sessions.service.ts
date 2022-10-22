import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SessionsModel } from '../models/sessions.model';
import { Repository } from 'typeorm';
import { BaseService } from '../../../../utils/base-models';

@Injectable()
export class SessionsService implements BaseService<SessionsModel> {
  constructor(
    @InjectRepository(SessionsModel)
    private repository: Repository<SessionsModel>,
  ) {}

  // create(input: any): Promise<SessionsModel> {
  //   return Promise.resolve(undefined);
  // }

  findAll(): Promise<SessionsModel[]> {
    return this.repository.find();
  }

  findOne(id: number): Promise<SessionsModel> {
    return this.repository.findOneBy({ id });
  }
}
