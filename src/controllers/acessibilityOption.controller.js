import { sliceArgs } from '../utils/query.utils';

/**
  * create - Essa função cria uma opção de acessibilidade na base de dados
  *
  * @function create
  * @param {object} parent Informações de um possível pai
  * @param {object} args Informações envadas na queuery ou mutation
  * @param {object} context Informações passadas no context para o apollo graphql
  */
const create = (parent, args, { acessibilityOptions }) => {
  const validate = {}; // validateAcessibilityOption(); fazer função de validação
  if (validate.error) throw new Error(validate.msg);

  return acessibilityOptions.create(args.acessibility_option)
    .then(resp => resp)
    .catch((err) => {
      throw new Error(err);
    });
};

/**
  * update - Essa função atualiza uma opção de acessibilidade.
  *
  * @function update
  * @param {object} parent Informações de um possível pai
  * @param {object} args Informações envadas na queuery ou mutation
  * @param {object} context Informações passadas no context para o apollo graphql
  */
const update = (parent, args, { acessibilityOptions }) => {
  const validate = {}; // validateAcessibilityOption(); fazer função de validação
  if (validate.error) throw new Error(validate.msg);

  return acessibilityOptions.findOneAndUpdate(
    { _id: args.acessibility_option_id },
    args.acessibility_option,
    { new: true },
  )
    .then(resp => resp)
    .catch((err) => {
      throw new Error(err);
    });
};

/**
  * findOne - Essa função procura e returna uma opção de acessibilidade.
  *
  * @function findOne
  * @param {object} parent Informações de um possível pai
  * @param {object} args Informações envadas na queuery ou mutation
  * @param {object} context Informações passadas no context para o apollo graphql
  */
const findOne = (parent, args, { acessibilityOptions }) => {
  const options = sliceArgs(args);

  return acessibilityOptions.findOne(options.query)
    .then(resp => resp)
    .catch((err) => {
      throw new Error(err);
    });
};

/**
  * findAll - Essa função procura e retorna varias opções de acessibilidade.
  *acessibility_option_id
  * @function findAll
  * @param {object} parent Informações de um possível pai
  * @param {object} args Informações envadas na queuery ou mutation
  * @param {object} context Informações passadas no context para o apollo graphql
  */
const findAll = (parent, args, { acessibilityOptions }) => {
  const options = sliceArgs(args);
  return acessibilityOptions.find(options.query.acessibility_option)
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
