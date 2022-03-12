import { GraphQLClient } from 'graphql-request';

export const gcms = new GraphQLClient(process.env.GRAPHCMS_ENDPOINT)
