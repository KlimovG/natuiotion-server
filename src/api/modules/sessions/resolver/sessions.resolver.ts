import { Query, Resolver } from '@nestjs/graphql';
import { SessionsService } from '../service/sessions.service';
import { Inject } from '@nestjs/common';
import { SessionsModel } from '../models/sessions.model';

@Resolver()
export class SessionsResolver {
  constructor(
    @Inject(SessionsService)
    private service: SessionsService,
  ) {}
  @Query((returns) => [SessionsModel])
  async getAllSessions(): Promise<SessionsModel[]> {
    return await this.service.findAll();
  }
}
