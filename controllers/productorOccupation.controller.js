/**
  * create - Essa função cria uma área de atuação para produtores no banco de dados.
  *
  * @function create
  * @param {object} parent Informações de um possível pai
  * @param {object} args Informações envadas na query ou mutation
  * @param {object} context Informações passadas no context para o apollo graphql
  */
const create = (parent, args, { productorOccupations }) => {
  const validate = {};
  if (validate.error) throw new Error(validate.msg);

  return productorOccupations.create(args.occupation)
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
const update = (parent, args, { productorOccupations }) => {
  const validate = {}; // validateCategoryOption(); fazer função de validação
  if (validate.error) throw new Error(validate.msg);

  return productorOccupations.findOneAndUpdate(
    { _id: args.id },
    args.occupation,
    { new: true },
  )
    .then(resp => resp)
    .catch((err) => {
      throw new Error(err);
    });
};

/**
  * findOne - Essa função procura e retorna uma opção de area de atuação no banco de dados.
  *
  * @function findOne
  * @param {object} parent Informações de um possível pai
  * @param {object} args Informações envadas na queuery ou mutation
  * @param {object} context Informações passadas no context para o apollo graphql
  */
const findOne = (parent, args, { productorOccupations }) => productorOccupations
  .findOne(args.occupation)
  .then(resp => resp)
  .catch((err) => {
    throw new Error(err);
  });

/**
  * findAll - Essa função procura e retorna várias opções de area de atuaçao no banco de dados.
  *
  * @function findAll
  * @param {object} parent Informações de um possível pai
  * @param {object} args Informações envadas na queuery ou mutation
  * @param {object} context Informações passadas no context para o apollo graphql
  */
const findAll = (parent, args, { productorOccupations }) => productorOccupations
  .find(args.occupation)
  .then(resp => resp)
  .catch((err) => {
    throw new Error(err);
  });

export default {
  create,
  findOne,
  findAll,
  update,
};
