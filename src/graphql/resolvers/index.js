import acessibilityOption from './acessibilityOption.resolver';
import categoryOption from './categoryOption.resolver';
import musicalStyleOption from './musicalStyleOption.resolver';
import spaceCapacityOption from './spaceCapacityOption.resolver';
import productor from './productor.resolver';
import artist from './artist.resolver';
import user from './user.resolver';
import database from './database.resolver';
import event from './event.resolver';
import song from './song.resolver';
import country from './country.resolver';
import state from './state.resolver';
import city from './city.resolver';
import location from './location.resolver';
import productorOccupation from './productorOccupation.resolver';
import communityUser from './communityUser.resolver';
import highlightedOportunity from './highlightedOportunity.resolver';
import newResolver from './new.resolver';
import newsLatterResolver from './newsLatter.resolver';

export default {
  Query: {
    ...acessibilityOption.queries,
    ...categoryOption.queries,
    ...musicalStyleOption.queries,
    ...spaceCapacityOption.queries,
    ...productor.queries,
    ...artist.queries,
    ...user.queries,
    ...event.queries,
    ...song.queries,
    ...country.queries,
    ...state.queries,
    ...city.queries,
    ...productorOccupation.queries,
    ...communityUser.queries,
    ...highlightedOportunity.queries,
    ...newResolver.queries,
    ...newsLatterResolver.queries,
  },
  Mutation: {
    ...acessibilityOption.mutations,
    ...categoryOption.mutations,
    ...musicalStyleOption.mutations,
    ...spaceCapacityOption.mutations,
    ...productor.mutations,
    ...artist.mutations,
    ...user.mutations,
    ...database.mutations,
    ...event.mutations,
    ...song.mutations,
    ...country.mutations,
    ...state.mutations,
    ...city.mutations,
    ...location.mutations,
    ...productorOccupation.mutations,
    ...communityUser.mutations,
    ...highlightedOportunity.mutations,
    ...newResolver.mutations,
    ...newsLatterResolver.mutations,
  },
};
