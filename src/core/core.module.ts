import { Module } from '@nestjs/common';
import { DatabaseModule } from './modules/database/database.module';
import { GraphqlModule } from './modules/graphql/graphql.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [DatabaseModule, GraphqlModule, AuthModule],
})
export class CoreModule {}
