import { sliceArgs } from '../utils/query.utils';

/**
  * create - Essa função cria uma opção de categoria no banco de dados.
  *
  * @function create
  * @param {object} parent Informações de um possível pai
  * @param {object} args Informações envadas na queuery ou mutation
  * @param {object} context Informações passadas no context para o apollo graphql
  */
const create = (parent, args, { categoryOptions }) => {
  const validate = {}; // validateCategoryOption(); fazer função de validação
  if (validate.error) throw new Error(validate.msg);

  return categoryOptions.create(args.category_option)
    .then(resp => resp)
    .catch((err) => {
      throw new Error(err);
    });
};

/**
  * update - Essa função atualiza uma opção de categoria no banco de dados.
  *
  * @function update
  * @param {object} parent Informações de um possível pai
  * @param {object} args Informações envadas na queuery ou mutation
  * @param {object} context Informações passadas no context para o apollo graphql
  */
const update = (parent, args, { categoryOptions }) => {
  const validate = {}; // validateCategoryOption(); fazer função de validação
  if (validate.error) throw new Error(validate.msg);

  return categoryOptions.findOneAndUpdate(
    { _id: args.category_option_id },
    args.category_option,
    { new: true },
  )
    .then(resp => resp)
    .catch((err) => {
      throw new Error(err);
    });
};

/**
  * findOne - Essa função procura e retorna uma opção de categoria no banco de dados.
  *
  * @function findOne
  * @param {object} parent Informações de um possível pai
  * @param {object} args Informações envadas na queuery ou mutation
  * @param {object} context Informações passadas no context para o apollo graphql
  */
const findOne = (parent, args, { categoryOptions }) => {
  const options = sliceArgs(args);

  return categoryOptions.findOne(options.query)
    .then(resp => resp)
    .catch((err) => {
      throw new Error(err);
    });
};

/**
  * findAll - Essa função procura e retorna várias opções de categoria no banco de dados.
  *
  * @function findAll
  * @param {object} parent Informações de um possível pai
  * @param {object} args Informações envadas na queuery ou mutation
  * @param {object} context Informações passadas no context para o apollo graphql
  */
const findAll = (parent, args, { categoryOptions }) => {
  const options = sliceArgs(args);
  return categoryOptions.find(options.query.category_option)
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
