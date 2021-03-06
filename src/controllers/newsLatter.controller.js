/**
  * create - Essa função cria uma noticia na base de dados
  *
  * @function create
  * @param {object} parent Informações de um possível pai
  * @param {object} args Informações envadas na query ou mutation
  * @param {object} context Informações passadas no context para o apollo graphql
  */
 const create = async (parent, args, { newsLatters }) => newsLatters
  .create(args.newsLatter);


  /**
  * findOne - Essa função procura e retorna uma newsLatter de evento na base de dados
  *
  * @function findOne
  * @param {object} parent Informações de um possível pai
  * @param {object} args Informações envadas na queuery ou mutation
  * @param {object} context Informações passadas no context para o apollo graphql
  */
const findOne = (parent, args, { newsLatters }) => newsLatters
  .findOne({ email: args.newsLatter.email });
/**
  * findAll - Essa função procura e retorna várias noticias no SOM
  * da base de dados
  *
  * @function findAll
  * @param {object} parent Informações de um possível pai
  * @param {object} args Informações envadas na query ou mutation
  * @param {object} context Informações passadas no context para o apollo graphql
  */
const findAll = async (parent, args, { newsLatters }) => newsLatters
  .find({});

export default {
  create,
  findAll,
  findOne,
};
