/**
  * create - Essa função cria uma localização na base de dados
  *
  * @function create
  * @param {object} parent Informações de um possível pai
  * @param {object} args Informações envadas na queuery ou mutation
  * @param {object} context Informações passadas no context para o apollo graphql
  */
const create = async (parent, args, { locations }) => locations
  .create(args.location);

/**
  * update - Essa função atualiza uma localização na base de dados
  *
  * @function update
  * @param {object} parent Informações de um possível pai
  * @param {object} args Informações envadas na queuery ou mutation
  * @param {object} context Informações passadas no context para o apollo graphql
  */
const update = (parent, args, { locations }) => locations
  .findOneAndUpdate({ _id: args.id }, args.location, { new: true });

export default {
  create,
  update,
};
