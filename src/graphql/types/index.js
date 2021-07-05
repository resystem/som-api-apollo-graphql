import artistType from './artist.type';
import productorType from './productor.type';
import userType from './user.type';
import acessibilityOptionType from './acessibilityOption.type';
import categoryOptionType from './categoryOption.type';
import musicalStyleOptionType from './musicalStyleOption.type';
import spaceCapacityOptionType from './spaceCapacityOption.type';
import paginatorType from './paginator.type';
import locationType from './location.type';
import eventType from './event.type';
import imageType from './image.type';
import songType from './song.type';
import countryType from './country.type';
import cityType from './city.type';
import stateType from './state.type';
import productorOccupationType from './productorOccupation.type';
import communityUserType from './communityUser.type';
import highlightedOportunityType from './highlightedOportunity.type';
import newType from './new.type';

export default `
  scalar JSON
  
  ${artistType}
  ${productorType}
  ${userType}
  ${locationType}
  ${eventType}
  ${songType}
  ${countryType}
  ${cityType}
  ${stateType}

  ${imageType}
  ${acessibilityOptionType}
  ${categoryOptionType}
  ${musicalStyleOptionType}
  ${spaceCapacityOptionType}
  ${productorOccupationType}

  ${communityUserType}
  ${highlightedOportunityType}
  ${newType}

  ${paginatorType}
`;
