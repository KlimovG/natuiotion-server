import { Module } from '@nestjs/common';
import { databaseProviders } from './database.config';

@Module({
  imports: [...databaseProviders],
  exports: [...databaseProviders],
})
export class DatabaseModule {}
