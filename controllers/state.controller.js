import { sliceArgs } from '../utils/query.utils';

/**
  * create - Essa função cria um artista na base de dados
  *
  * @function create
  * @param {object} parent Informações de um possível pai
  * @param {object} args Informações envadas na queuery ou mutation
  * @param {object} context Informações passadas no context para o apollo graphql
  */
const create = async (parent, args, { states }) => {
  const validate = {}; // validateArtist(); fazer função de validação
  if (validate.error) throw new Error(validate.msg);

  // Craete artist in the database
  return states.create(args.state)
    .then(async resp => resp.populate('country')
      .execPopulate())
    .catch((err) => {
      throw new Error(err);
    });
};

/**
  * update - Essa função atualiza um artista na base de dados
  *
  * @function update
  * @param {object} parent Informações de um possível pai
  * @param {object} args Informações envadas na queuery ou mutation
  * @param {object} context Informações passadas no context para o apollo graphql
  */
const update = (parent, args, { states }) => {
  const validate = {}; // validateArtist(); fazer função de validação
  if (validate.error) throw new Error(validate.msg);

  return states.findOneAndUpdate({ _id: args.id }, args.state, { new: true })
    .populate('country')
    .then(resp => resp)
    .catch((err) => {
      throw new Error(err);
    });
};

/**
  * findOne - Essa função procura e retorna um artista na base de dados
  *
  * @function findOne
  * @param {object} parent Informações de um possível pai
  * @param {object} args Informações envadas na queuery ou mutation
  * @param {object} context Informações passadas no context para o apollo graphql
  */
const findOne = (parent, args, { states }) => {
  const options = sliceArgs(args);

  return states.findOne(options.query.state)
    .populate('country')
    .then(resp => resp)
    .catch((err) => {
      throw new Error(err);
    });
};

/**
  * findAll - Essa função procura e retorna vários artistas da base de dados
  *
  * @function findAll
  * @param {object} parent Informações de um possível pai
  * @param {object} args Informações envadas na queuery ou mutation
  * @param {object} context Informações passadas no context para o apollo graphql
  */
const findAll = async (parent, args, { states }) => {
  const options = sliceArgs(args);
  const myCountries = await states.find(options.query.state).populate('country');
  console.log('TCL: findAll -> myCountries', myCountries);
  return myCountries.map((c) => {
    const country = c;
    country.id = c._id;
    return country;
  });
};

export default {
  create,
  findOne,
  findAll,
  update,
};
