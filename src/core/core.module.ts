import { Module } from '@nestjs/common';
import { DatabaseModule } from './modules/database/database.module';
import { GraphqlModule } from './modules/graphql/graphql.module';

@Module({
  imports: [DatabaseModule, GraphqlModule],
})
export class CoreModule {}
