import * as dotenv from 'dotenv';
import {
  DB_HOST,
  DB_NAME,
  DB_PASSWORD,
  DB_PORT,
  DB_USER,
  NODE_ENV,
} from '../../../utils/constant';
import { TypeOrmModule } from '@nestjs/typeorm';

dotenv.config();

export const databaseProviders = [
  TypeOrmModule.forRoot({
    type: 'mysql',
    host: DB_HOST,
    port: Number(DB_PORT),
    username: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
    logger: 'advanced-console',
    entities: [process.cwd() + '/../**/*.model.js'],
    synchronize: NODE_ENV === 'production',
    connectorPackage: 'mysql2',
  }),
];
