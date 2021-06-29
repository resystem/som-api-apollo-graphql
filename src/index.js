import { ApolloServer } from 'apollo-server';
import { makeExecutableSchema } from 'graphql-tools';
import schema from './graphql/schema';

// Put together a schema
const excSchema = makeExecutableSchema(schema);

// Initialize the app
const app = new ApolloServer({
  ...schema,
  introspection: true,
  playground: true,
  playground: {
    settings: {
      'editor.theme': 'light',
    },
  },
  path: '/graphql',
});

// Start the server
app.listen(3000, () => {
  console.log('Go to http://localhost:3000/graphiql to run queries!');
});
