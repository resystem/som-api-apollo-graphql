import { sliceArgs } from '../utils/query.utils';

/**
  * create - Essa função cria uma opção de estilo musical na base de dados
  *
  * @function create
  * @param {object} parent Informações de um possível pai
  * @param {object} args Informações envadas na queuery ou mutation
  * @param {object} context Informações passadas no context para o apollo graphql
  */
const create = (parent, args, { musicalStyleOptions }) => {
  const validate = {}; // validateMusicalStyleOption(); fazer função de validação
  if (validate.error) throw new Error(validate.msg);

  return musicalStyleOptions.create(args.musical_style_option)
    .then(resp => resp)
    .catch((err) => {
      throw new Error(err);
    });
};

/**
  * update - Essa função atualiza uma opção de estilo musical na base de dados
  *
  * @param {object} parent Informações de um possível pai
  * @param {object} args Informações envadas na queuery ou mutation
  * @param {object} context Informações passadas no context para o apollo graphql
  */
const update = (parent, args, { musicalStyleOptions }) => {
  const validate = {}; // validateMusicalStyleOption(); fazer função de validação
  if (validate.error) throw new Error(validate.msg);

  return musicalStyleOptions.findOneAndUpdate(
    { _id: args.musical_style_option_id },
    args.musical_style_option,
    { new: true },
  )
    .then(resp => resp)
    .catch((err) => {
      throw new Error(err);
    });
};

/**
  * findOne - Essa função procura e retorna uma opção de estilo musical na base de dados
  *
  * @function findOne
  * @param {object} parent Informações de um possível pai
  * @param {object} args Informações envadas na queuery ou mutation
  * @param {object} context Informações passadas no context para o apollo graphql
  */
const findOne = (parent, args, { musicalStyleOptions }) => {
  const options = sliceArgs(args);

  return musicalStyleOptions.findOne(options.query)
    .then(resp => resp)
    .catch((err) => {
      throw new Error(err);
    });
};

/**
  * findAll - Essa função procura e returna várias opções de estilo musical na base de dados
  *
  * @param {object} parent Informações de um possível pai
  * @param {object} args Informações envadas na queuery ou mutation
  * @param {object} context Informações passadas no context para o apollo graphql
  */
const findAll = (parent, args, { musicalStyleOptions }) => {
  const options = sliceArgs(args);
  return musicalStyleOptions.find(options.query.musical_style_option)
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
