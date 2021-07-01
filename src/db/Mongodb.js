/* eslint-disable no-console */
import mongoose from 'mongoose';

import acessibilityOptions from './schemas/acessibilityOptions.model';
import categoryOptions from './schemas/categoryOptions.model';
import musicalStyleOptions from './schemas/musicalStyleOptions.model';
import spaceCapacityOptions from './schemas/spaceCapacityOptions.model';
import productors from './schemas/productors.model';
import artists from './schemas/artists.model';
import users from './schemas/users.model';
import productorOccupations from './schemas/productorOccupations.model';
import events from './schemas/events.model';
import locations from './schemas/locations.model';
import songs from './schemas/songs.model';
import countries from './schemas/country.model';
import states from './schemas/state.model';
import cities from './schemas/city.model';

export default async ({ mongoUrl }) => {
  console.log('mongoUrl:', mongoUrl);
  try {
    console.log('=> using new database connection');

    const connection = await mongoose.createConnection(mongoUrl || 'mongodb://localhost/som-local', {
      bufferCommands: false,
      bufferMaxEntries: 0,
      keepAlive: true,
      useNewUrlParser: true,
      useFindAndModify: false,
      useCreateIndex: true,
      useUnifiedTopology: true,

    });
    connection.model('acessibilityOptions', acessibilityOptions);
    connection.model('categoryOptions', categoryOptions);
    connection.model('musicalStyleOptions', musicalStyleOptions);
    connection.model('spaceCapacityOptions', spaceCapacityOptions);
    connection.model('productors', productors);
    connection.model('productorOccupations', productorOccupations);
    connection.model('artists', artists);
    connection.model('users', users);
    connection.model('events', events);
    connection.model('locations', locations);
    connection.model('songs', songs);
    connection.model('countries', countries);
    connection.model('states', states);
    connection.model('cities', cities);
    return connection;
  } catch (err) {
    throw err;
  }
};
