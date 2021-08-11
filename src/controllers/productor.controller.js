import { getAuthorization, mapProducerToSales, sendToSalesForce } from '../services/salesforce.service';
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
  const validate = {}; // validateproductor(); fazer função de validação
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

  let salesforceId = '';
  try {
    const mappedToSales = mapProducerToSales(productor);
    const auth = await getAuthorization();
    const salesForceUser = await sendToSalesForce(auth, mappedToSales);
    salesforceId = salesForceUser.id;
  } catch (err) {
    throw err;
    console.log('err:', err);
  }

  await users.update(
    { _id: productor.user._id },
    { productor: productor._id, sales_id: salesforceId },
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
const update = async (parent, args, { productors, users }) => {
  const validate = {}; // validateproductor(); fazer função de validação
  if (validate.error) throw new Error(validate.msg);

  const producer = await productors.findOneAndUpdate({ _id: args.productor_id }, args.productor, { new: true })
    .populate('user')
    .populate('events')
    .populate('musical_styles')
    .populate('occupations')
    .populate('location')
    .populate('follows.user')
    .then(resp => resp)
    .catch((err) => {
      throw new Error(err);
    });

  let salesforceId = '';
  try {
    const mappedToSales = mapProducerToSales(producer);
    const auth = await getAuthorization();
    const salesForceUser = await sendToSalesForce(auth, mappedToSales);
    salesforceId = salesForceUser.id;
  } catch (err) {
    throw err;
  }

  await users.update(
    { _id: producer.user._id },
    { sales_id: salesforceId },
  );

  return producer;
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
      'approved_productors',
      'reproved_productors',
      'location',
    ],
  })
  .populate('musical_styles')
  .populate('occupations')
  .populate('location')
  .populate('follows.user')
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
        'approved_productors',
        'reproved_productors',
        'location',
      ],
    })
    .populate('musical_styles')
    .populate('occupations')
    .populate('location')
    .populate('follows.user')
    .then(resp => resp)
    .catch((err) => {
      throw new Error(err);
    });
};

/**
  * follow - Essa função segue um produtor
  *
  * @function follow
  * @param {object} parent Informações de um possível pai
  * @param {object} args Informações envadas na queuery ou mutation
  * @param {object} context Informações passadas no context para o apollo graphql
  */
const follow = async (parent, args, { productors, users }) => {
  const { productor, user } = args;
  await users.findOneAndUpdate(
    { _id: user },
    {
      $push: { following_productors: productor },
    },
    { new: true },
  );
  return productors.findOneAndUpdate({ _id: productor }, { follows: { user } }, { new: true })
    .populate('user')
    .populate('events')
    .populate({
      path: 'events',
      populate: [
        'subscribers',
        'approved_productors',
        'reproved_productors',
        'location',
      ],
    })
    .populate('musical_styles')
    .populate('occupations')
    .populate('location')
    .populate('follows.user')
    .then(resp => resp)
    .catch((err) => {
      throw new Error(err);
    });
};

/**
  * unfollow - Essa função deixa de seguir um produtor
  *
  * @function follow
  * @param {object} parent Informações de um possível pai
  * @param {object} args Informações envadas na queuery ou mutation
  * @param {object} context Informações passadas no context para o apollo graphql
  */
const unfollow = async (parent, args, { productors, users }) => {
  try {
    const { productor, user } = args;
    await users.findOneAndUpdate(
      { _id: user },
      {
        $pull: { following_productors: productor },
      },
      { new: true },
    );

    const myproductor = await productors.findOneAndUpdate(
      { _id: productor },
      { $pull: { follows: { user } } },
      { new: true },
    )
      .populate('user')
      .populate('events')
      .populate({
        path: 'events',
        populate: [
          'subscribers',
          'approved_productors',
          'reproved_productors',
          'location',
        ],
      })
      .populate('musical_styles')
      .populate('occupations')
      .populate('location')
      .populate('follows.user')
      .then(resp => resp)
      .catch((err) => {
        throw new Error(err);
      });

    return myproductor;
  } catch (err) {
    throw err;
  }
};

export default {
  create,
  findOne,
  findAll,
  update,
  follow,
  unfollow
};
