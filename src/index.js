import { ApolloServer } from 'apollo-server';
import schema from './graphql/schema';
import MongoDB from './db/Mongodb';

const initMongo = async () => {
  const mongoDb = await MongoDB({
    mongoUrl: process.env.MONGO_URL ? `mongodb+${process.env.MONGO_URL}` : null,
  });
  return mongoDb;
}
initMongo().then((mongo) => {
  const app = new ApolloServer({
    ...schema,
    // introspection: true,
    playground: true,
    playground: {
      settings: {
        'editor.theme': 'dark',
      },
    },
    path: '/graphql',
    context: async ({ context }) => {
      return ({
        headers: event.headers,
        functionName: context.functionName,
        context,
        acessibilityOptions: mongo.model('acessibilityOptions'),
        categoryOptions: mongo.model('categoryOptions'),
        productorOccupations: mongo.model('productorOccupations'),
        musicalStyleOptions: mongo.model('musicalStyleOptions'),
        spaceCapacityOptions: mongo.model('spaceCapacityOptions'),
        productors: mongo.model('productors'),
        artists: mongo.model('artists'),
        users: mongo.model('users'),
        events: mongo.model('events'),
        locations: mongo.model('locations'),
        songs: mongo.model('songs'),
        countries: mongo.model('countries'),
        states: mongo.model('states'),
        cities: mongo.model('cities'),
      });
    }
  });
  
  // Start the server
  app.listen(3000, () => {
    console.log(`
      playground running on: http://localhost:3000/playground
      graphql running on: http://localhost:3000/graphql
    `);
  });
});

// Initialize the app
