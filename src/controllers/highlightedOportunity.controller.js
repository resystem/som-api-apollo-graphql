/**
  * create - Essa função cria uma oportunidade em destaque base de dados
  *
  * @function create
  * @param {object} parent Informações de um possível pai
  * @param {object} args Informações envadas na query ou mutation
  * @param {object} context Informações passadas no context para o apollo graphql
  */
const create = async (parent, args, { highlightedOportunities }) => {
  const validate = {}; // fazer função de validação
  if (validate.error) throw new Error(validate.msg);

  // cria uma oportunidade em destaque no banco de dados
  return highlightedOportunities.create(args.highlighted_oportunity)
    .then(resp => resp
      .populate('oportunity')
      .execPopulate())
    .catch((err) => {
      throw new Error(err);
    });
};

/**
  * findAll - Essa função procura e retorna vários oportunidades destacadas no SOM
  * da base de dados
  *
  * @function findAll
  * @param {object} parent Informações de um possível pai
  * @param {object} args Informações envadas na query ou mutation
  * @param {object} context Informações passadas no context para o apollo graphql
  */
const findAll = async (parent, args, { highlightedOportunities }) => highlightedOportunities
  .find({})
  .populate('oportunity');

export default {
  create,
  findAll,
};
