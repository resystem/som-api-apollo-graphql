// models
import acessibilityOptionQuery from './acessibilityOption.query';
import categoryOptionQuery from './categoryOption.query';
import musicalStyleOptionQuery from './musicalStyleOption.query';
import spaceCapacityOptionQuery from './spaceCapacityOption.query';
import productorOccupationQuery from './productorOccupation.query';
// entities
import productorQuery from './productor.query';
import artistQuery from './artist.query';
import userQuery from './user.query';
import eventQuery from './event.query';
import songQuery from './song.query';
import countryQuery from './country.query';
import cityQuery from './city.query';
import stateQuery from './state.query';
import communityUserQuery from './communityUser.query';
import highlightedOportunityQuery from './highlightedOportunity.query';
import newQuery from './new.query';

export default `
  type Query {
    ${acessibilityOptionQuery}
    ${categoryOptionQuery}
    ${musicalStyleOptionQuery}
    ${spaceCapacityOptionQuery}
    ${countryQuery}
    ${cityQuery}
    ${stateQuery}
    
    ${productorQuery}
    ${artistQuery}
    ${userQuery}
    ${eventQuery}
    ${songQuery}
    ${productorOccupationQuery}

    ${communityUserQuery}
    ${highlightedOportunityQuery}
    ${newQuery}
  }
`;
