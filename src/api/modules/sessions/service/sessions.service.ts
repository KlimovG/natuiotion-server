import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SessionsModel } from '../models/sessions.model';
import { LessThan, Repository } from 'typeorm';
import { BaseService } from '../../../../utils/base-models';

@Injectable()
export class SessionsService implements BaseService<SessionsModel> {
  private readonly logger = new Logger('Session');

  constructor(
    @InjectRepository(SessionsModel)
    private sessionRepo: Repository<SessionsModel>,
  ) {}

  findAll(): Promise<SessionsModel[]> {
    return this.sessionRepo.find();
  }

  async findAllByName(robotSerialNumber: string): Promise<SessionsModel[]> {
    const sessions = await this.sessionRepo.find({
      where: {
        robotNumber: robotSerialNumber,
      },
      relations: {
        extractedWeeds: true,
      },
      order: {
        startTime: 'DESC',
      },
      take: 10,
    });

    return this.mapSessionsToClient(sessions);
  }

  findOne(id: number): Promise<SessionsModel> {
    return this.sessionRepo.findOneBy({ id });
  }

  async findAllByNameStartFromSessionWithId(
    robotSerialNumber: string,
    startSessionId: number,
  ): Promise<SessionsModel[]> {
    const startSession = await this.findOne(startSessionId);
    if (!startSession) {
      throw new Error('Start session not found');
    }
    this.logger.log(
      `Find 10 more sessions from ${startSession.startTime.toDateString()} for robot ${robotSerialNumber}`,
    );
    const sessions = await this.sessionRepo.find({
      where: {
        robotNumber: robotSerialNumber,
        startTime: LessThan(startSession.startTime),
      },
      relations: {
        extractedWeeds: true,
      },
      order: {
        startTime: 'DESC',
      },
      take: 10,
    });
    return this.mapSessionsToClient(sessions);
  }

  private mapSessionsToClient(sessions: SessionsModel[]): SessionsModel[] {
    return sessions.map((session) => {
      if (session?.extractedWeeds && session?.extractedWeeds?.length) {
        session.extracted = session.extractedWeeds.reduce(
          (acc, value) => acc + value.number,
          0,
        );
      }
      const label = session?.fieldName?.label;
      if (!!label) {
        session.fieldName.label = session.fieldName.label
          .replace(/[\W_]+(?=-)|\d+(?=%)|%.*?\d+\s?/g, ' ')
          .trim();
      }
      return session;
    });
  }
}
