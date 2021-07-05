/**
  * create - Essa função cria um usuário na lista de comunidade na base de dados
  *
  * @function create
  * @param {object} parent Informações de um possível pai
  * @param {object} args Informações envadas na query ou mutation
  * @param {object} context Informações passadas no context para o apollo graphql
  */
const create = async (parent, args, { communityUsers }) => {
  const validate = {}; // fazer função de validação
  if (validate.error) throw new Error(validate.msg);

  // cria um usuario da comunidade no banco de dados
  return communityUsers.create(args.community_user)
    .then(async resp => resp.populate('user')
      .execPopulate())
    .catch((err) => {
      throw new Error(err);
    });
};

/**
  * findAll - Essa função procura e retorna vários usuários da comunidade SOM
  * da base de dados
  *
  * @function findAll
  * @param {object} parent Informações de um possível pai
  * @param {object} args Informações envadas na query ou mutation
  * @param {object} context Informações passadas no context para o apollo graphql
  */
const findAll = async (parent, args, { communityUsers }) => communityUsers.find({})
  .populate('user');

export default {
  create,
  findAll,
};
