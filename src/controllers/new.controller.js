/**
  * create - Essa função cria uma noticia na base de dados
  *
  * @function create
  * @param {object} parent Informações de um possível pai
  * @param {object} args Informações envadas na query ou mutation
  * @param {object} context Informações passadas no context para o apollo graphql
  */
const create = async (parent, args, { news }) => {
  const validate = {}; // fazer função de validação
  if (validate.error) throw new Error(validate.msg);

  // cria uma oportunidade em destaque no banco de dados
  return news.create(args.new)
    .then(async resp => resp)
    .catch((err) => {
      throw new Error(err);
    });
};

/**
  * findAll - Essa função procura e retorna várias noticias no SOM
  * da base de dados
  *
  * @function findAll
  * @param {object} parent Informações de um possível pai
  * @param {object} args Informações envadas na query ou mutation
  * @param {object} context Informações passadas no context para o apollo graphql
  */
const findAll = async (parent, args, { news }) => news
  .find({});

export default {
  create,
  findAll,
};
