import { ApolloServer } from 'apollo-server';
import schema from './graphql/schema';
import dotenv from 'dotenv';
import MongoDB from './db/Mongodb';

dotenv.config()

const initMongo = async () => {
  const mongoDb = await MongoDB({
    mongoUrl: process.env.MONGO_URL ? `mongodb+${process.env.MONGO_URL}` : null,
  });
  return mongoDb;
}
initMongo().then((mongo) => {
  const app = new ApolloServer({
    ...schema,
    introspection: true,
    playground: true,
    playground: {
      settings: {
        'editor.theme': 'dark',
      },
    },
    formatError: (err) => {
      console.log('🚀 ~ err', err);
      // Don't give the specific errors to the client.
      if (err.message.startsWith('Database Error: ')) {
        return new Error('Internal server error');
      }
      // Otherwise return the original error. The error can also
      // be manipulated in other ways, as long as it's returned.
      return err;
    },
    path: '/',
    context: ({ req }) => {
      return ({
        req,
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
      })
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
