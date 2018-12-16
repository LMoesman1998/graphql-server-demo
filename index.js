const { ApolloServer, gql } = require('apollo-server');
const graphqlSchema = require('./schema');

// Construct a schema, using GraphQL schema language
const typeDefs = gql`${graphqlSchema.getSchema()}`;

const resolvers = graphqlSchema.getResolvers();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
  playground: true,
  engine: process.env.ENGINE_API_KEY && {
    apiKey: process.env.ENGINE_API_KEY,
  },
});

server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
