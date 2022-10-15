import { Module } from '@nestjs/common';
import { graphqlConfig } from './graphql.config';

@Module({
  imports: [...graphqlConfig],
  exports: [...graphqlConfig],
})
export class GraphqlModule {}
