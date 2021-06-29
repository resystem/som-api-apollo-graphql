import { sliceArgs } from '../utils/query.utils';

/**
  * create - Essa função cria um produtor de evento na base de dados
  *
  * @function create
  * @param {object} parent Informações de um possível pai
  * @param {object} args Informações envadas na queuery ou mutation
  * @param {object} context Informações passadas no context para o apollo graphql
  */
const create = async (parent, args, { productors, users }) => {
  const validate = {}; // validateArtist(); fazer função de validação
  if (validate.error) throw new Error(validate.msg);

  const productor = await productors.create(args.productor)
    .then(resp => resp
      .populate('user')
      .populate('events')
      .populate({
        path: 'events',
        populate: {
          path: 'location',
        },
      })
      .populate('musical_styles')
      .populate('occupations')
      .populate('location')
      .execPopulate())
    .catch((err) => {
      throw new Error(err);
    });

  await users.update(
    { _id: productor.user._id },
    { productor: productor._id },
    { new: true },
  );

  return productor;
};

/**
  * update - Essa função atualiza um produtor de evento na base de dados
  *
  * @function update
  * @param {object} parent Informações de um possível pai
  * @param {object} args Informações envadas na queuery ou mutation
  * @param {object} context Informações passadas no context para o apollo graphql
  */
const update = (parent, args, { productors }) => {
  const validate = {}; // validateArtist(); fazer função de validação
  if (validate.error) throw new Error(validate.msg);

  return productors.findOneAndUpdate({ _id: args.productor_id }, args.productor, { new: true })
    .populate('user')
    .populate('events')
    .populate('musical_styles')
    .populate('occupations')
    .populate('location')
    .then(resp => resp)
    .catch((err) => {
      throw new Error(err);
    });
};

/**
  * findOne - Essa função procura e retorna um produtor de evento na base de dados
  *
  * @function findOne
  * @param {object} parent Informações de um possível pai
  * @param {object} args Informações envadas na queuery ou mutation
  * @param {object} context Informações passadas no context para o apollo graphql
  */
const findOne = (parent, args, { productors }) => productors.findOne({ _id: args.productor.id })
  .populate('user')
  .populate('events')
  .populate({
    path: 'events',
    populate: [
      'subscribers',
      'approved_artists',
      'reproved_artists',
      'location',
    ],
  })
  .populate('musical_styles')
  .populate('occupations')
  .populate('location')
  .then(resp => resp)
  .catch((err) => {
    throw new Error(err);
  });

/**
  * findAll - Essa função procura e retorna vários produtores de eventos da base de dados
  *
  * @function findAll
  * @param {object} parent Informações de um possível pai
  * @param {object} args Informações envadas na queuery ou mutation
  * @param {object} context Informações passadas no context para o apollo graphql
  */
const findAll = (parent, args, { productors }) => {
  const options = sliceArgs(args);
  return productors.find(options.query.productor)
    .populate('user')
    .populate('events')
    .populate({
      path: 'events',
      populate: [
        'subscribers',
        'approved_artists',
        'reproved_artists',
        'location',
      ],
    })
    .populate('musical_styles')
    .populate('occupations')
    .populate('location')
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
