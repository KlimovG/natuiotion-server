import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SessionsModel } from '../models/sessions.model';
import { Repository } from 'typeorm';
import { BaseService } from '../../../../utils/base-models';
import { FieldModel } from '../../map/models/field.model';

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

  async findLast(robotSerialNumber: string): Promise<SessionsModel> {
    return (
      await this.sessionRepo.find({
        where: {
          robotNumber: robotSerialNumber,
        },
        relations: {
          extractedWeeds: true,
        },
        order: {
          startTime: 'DESC',
        },
        take: 1,
      })
    ).at(0);
  }

  async findAllByName(robotSerialNumber: string): Promise<SessionsModel[]> {
    const sessions = await this.sessionRepo
      .createQueryBuilder('session')
      .innerJoinAndSelect('session.fieldName', 'field')
      .leftJoinAndSelect('session.extractedWeeds', 'extractedWeeds')
      .select([
        'session.id AS id',
        'session.startTime as startTime',
        'session.endTime as endTime',
        'session.prevSessionId as prevSessionId',
        'session.robotNumber as robotNumber',
        'field.id as fieldId',
        'field.label as label',
        'COUNT(extractedWeeds.number) AS extracted',
      ])
      .where('session.robotNumber = :robotSerialNumber', { robotSerialNumber })
      .orderBy('session.startTime', 'DESC')
      .groupBy('session.id')
      .limit(10)
      .getRawMany();

    return this.mapSessionsToClient(sessions);
  }

  async findOne(id: number): Promise<SessionsModel> {
    return await this.sessionRepo
      .createQueryBuilder('session')
      .innerJoinAndSelect('session.fieldName', 'field')
      .leftJoinAndSelect('session.extractedWeeds', 'extractedWeeds')
      .where('session.id = :id', { id })
      .select([
        'session.id AS id',
        'session.startTime as startTime',
        'session.endTime as endTime',
        'session.prevSessionId as prevSessionId',
        'session.robotNumber as robotNumber',
        'field.id as fieldId',
        'COUNT(extractedWeeds.number) AS extracted',
      ])
      .getRawOne();
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

    const sessions = await this.sessionRepo
      .createQueryBuilder('session')
      .innerJoinAndSelect('session.fieldName', 'field')
      .leftJoinAndSelect('session.extractedWeeds', 'extractedWeeds')
      .where('session.robotNumber = :robotSerialNumber', { robotSerialNumber })
      .andWhere('session.startTime < :startingTime', {
        startingTime: startSession.startTime,
      })
      .groupBy('session.id')
      .orderBy('session.startTime', 'DESC')
      .limit(10)
      .select([
        'session.id AS id',
        'session.startTime as startTime',
        'session.endTime as endTime',
        'session.prevSessionId as prevSessionId',
        'session.robotNumber as robotNumber',
        'field.id as fieldId',
        'field.label as label',
        'COUNT(extractedWeeds.number) AS extracted',
      ])
      .getRawMany();
    return this.mapSessionsToClient(sessions);
  }

  private mapSessionsToClient(sessions: SessionsModel[]): SessionsModel[] {
    return sessions.map((session) => {
      const label = session?.['label'];
      if (!!label) {
        const field = new FieldModel();
        field.label = label
          .replace(/[\W_]+(?=-)|\d+(?=%)|%.*?\d+\s?/g, ' ')
          .trim();
        field.id = session?.['fieldId'];
        session.fieldName = field;
      }
      return session;
    });
  }
}
