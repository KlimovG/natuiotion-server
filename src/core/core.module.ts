import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { DatabaseModule } from './modules/database/database.module';
import { GraphqlModule } from './modules/graphql/graphql.module';

@Module({
  imports: [DatabaseModule, GraphqlModule, AuthModule],
  exports: [DatabaseModule, GraphqlModule, AuthModule],
})
export class CoreModule {}
