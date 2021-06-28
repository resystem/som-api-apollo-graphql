import musicalStylesModel from '../assets/musicalStyles.model';
import spaceCapacityModel from '../assets/spaceCapacity.model';
import acessibilitiesModel from '../assets/acessibilities.model';
import categoriesModel from '../assets/categories.model';

/**
  * populateMusicalStyles - Essa função popula os estilos musicais na base de dados
  *
  * @function populateMusicalStyles
  * @param {object} parent
  * @param {object} args Informações envadas na queuery ou mutation
  * @param {object} context Informações passadas no context para o apollo graphql
  */
export const populateMusicalStyle = (parent, args, { musicalStyleOptions }) => musicalStyleOptions
  .insertMany(musicalStylesModel)
  .then(resp => resp)
  .catch((err) => {
    throw new Error(err);
  });

/**
  * populateSpaceCapacity - Essa função popula as opções sobre a
  *     capacidade de espaço na base de dados
  *
  * @function populateSpaceCapacity
  * @param {object} parent
  * @param {object} args Informações envadas na queuery ou mutation
  * @param {object} context Informações passadas no context para o apollo graphql
  */
export const populateSpaceCapacity = (
  parent,
  args,
  { spaceCapacityOptions },
) => spaceCapacityOptions.insertMany(spaceCapacityModel)
  .then(resp => resp)
  .catch((err) => {
    throw new Error(err);
  });

/**
  * populateAcessibility - Essa função popula as opções de acessibilidade na base de dados
  *
  * @function populateAcessibility
  * @param {object} parent
  * @param {object} args Informações envadas na queuery ou mutation
  * @param {object} context Informações passadas no context para o apollo graphql
  */
export const populateAcessibility = (parent, args, { acessibilityOptions }) => acessibilityOptions
  .insertMany(acessibilitiesModel)
  .then(resp => resp)
  .catch((err) => {
    throw new Error(err);
  });

/**
  * populateCategories - Essa função popula as opções de categoria de artista
  *     musical na base de dados
  *
  * @function populateCategories
  * @param {object} parent
  * @param {object} args Informações envadas na queuery ou mutation
  * @param {object} context Informações passadas no context para o apollo graphql
  */
export const populateCategories = (parent, args, { categoryOptions }) => categoryOptions
  .insertMany(categoriesModel)
  .then(resp => resp)
  .catch((err) => {
    throw new Error(err);
  });
