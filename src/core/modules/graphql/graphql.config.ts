import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Logger } from '@nestjs/common';

export const graphqlConfig = [
  GraphQLModule.forRoot<ApolloDriverConfig>({
    driver: ApolloDriver,
    autoSchemaFile: 'schema.gql',
    context: ({ req }) => ({ headers: req.headers }),
    documentStore: null,
  }),
];
