import { sliceArgs } from '../utils/query.utils';

/**
  * create - Essa função cria uma opção de capacidade do espaço na base de dados
  *
  * @function create
  * @param {object} parent Informações de um possível pai
  * @param {object} args Informações envadas na queuery ou mutation
  * @param {object} context Informações passadas no context para o apollo graphql
  */
const create = (parent, args, { spaceCapacityOptions }) => {
  const validate = {}; // validateSpaceCapacityOption(); fazer função de validação
  if (validate.error) throw new Error(validate.msg);

  // Craete spaceCapacity in the database
  return spaceCapacityOptions.create(args.space_capacity_option)
    .then(resp => resp)
    .catch((err) => {
      throw new Error(err);
    });
};

/**
  * update - Essa função atualiza uma opção de capacidade do espaço na base de dados
  *
  * @function update
  * @param {object} parent Informações de um possível pai
  * @param {object} args Informações envadas na queuery ou mutation
  * @param {object} context Informações passadas no context para o apollo graphql
  */
const update = (parent, args, { spaceCapacityOptions }) => {
  const validate = {}; // validateSpaceCapacityOption(); fazer função de validação
  if (validate.error) throw new Error(validate.msg);

  return spaceCapacityOptions.findOneAndUpdate(
    { _id: args.space_capacity_option_id },
    args.space_capacity_option,
    { new: true },
  )
    .then(resp => resp)
    .catch((err) => {
      throw new Error(err);
    });
};

/**
  * findOne - Essa função procura e retorna uma opção de capacidade do espaço na base de dados
  *
  * @function findOne
  * @param {object} parent Informações de um possível pai
  * @param {object} args Informações envadas na queuery ou mutation
  * @param {object} context Informações passadas no context para o apollo graphql
  */
const findOne = (parent, args, { spaceCapacityOptions }) => {
  const options = sliceArgs(args);

  return spaceCapacityOptions.findOne(options.query)
    .then(resp => resp)
    .catch((err) => {
      throw new Error(err);
    });
};

/**
  * findAll - Essa função procura e retorna várias opções de capacidade do espaço na base de dados
  *
  * @function findAll
  * @param {object} parent Informações de um possível pai
  * @param {object} args Informações envadas na queuery ou mutation
  * @param {object} context Informações passadas no context para o apollo graphql
  */
const findAll = (parent, args, { spaceCapacityOptions }) => {
  const options = sliceArgs(args);
  return spaceCapacityOptions.find(options.query.space_capacity_option)
    .then(resp => resp)
    .catch((err) => {
      throw new Error(err);
    });
};

export default {
  create,
  findOne,
  findAll,
  update,
};
