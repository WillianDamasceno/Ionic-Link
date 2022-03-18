import { GraphQLClient } from 'graphql-request';

export const gcms = new GraphQLClient(
  process.env.GRAPHCMS_ENDPOINT,
  {
    headers: {
      authorization: `Bearer ${process.env.GRAPHCMS_PRODUCTION_TOKEN}`
    }
  }
)
