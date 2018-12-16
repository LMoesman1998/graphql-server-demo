const { ApolloServer, gql } = require('apollo-server');
const graphqlSchema = require('./schema');

// Construct a schema, using GraphQL schema language
//var schema = buildSchema(graphqlSchema.getSchema());
// The root provides a resolver function for each API endpoint
// Parameters could be: obj, args, context, info
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

// This `listen` method launches a web-server.  Existing apps
// can utilize middleware options, which we'll discuss later.
server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
