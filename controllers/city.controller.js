import { sliceArgs } from '../utils/query.utils';

/**
  * create - Essa função cria um artista na base de dados
  *
  * @function create
  * @param {object} parent Informações de um possível pai
  * @param {object} args Informações envadas na queuery ou mutation
  * @param {object} context Informações passadas no context para o apollo graphql
  */
const create = async (parent, args, { cities }) => {
  const validate = {}; // validateArtist(); fazer função de validação
  if (validate.error) throw new Error(validate.msg);

  // Craete artist in the database
  return cities.create(args.city)
    .then(async resp => resp.populate('state')
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
const update = (parent, args, { cities }) => {
  const validate = {}; // validateArtist(); fazer função de validação
  if (validate.error) throw new Error(validate.msg);

  return cities.findOneAndUpdate({ _id: args.id }, args.city, { new: true })
    .populate('state')
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
const findOne = (parent, args, { cities }) => {
  const options = sliceArgs(args);

  return cities.findOne(options.query.city)
    .populate('state')
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
const findAll = async (parent, args, { cities }) => {
  const options = sliceArgs(args);
  const mycities = await cities.find(options.query.city).populate('state');
  return mycities.map((c) => {
    const city = c;
    city.id = c._id;
    return city;
  });
};

export default {
  create,
  findOne,
  findAll,
  update,
};
