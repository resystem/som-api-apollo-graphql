import {
  getAuthorization,
  mapProducerToSales,
  sendToSalesForce
} from '../services/salesforce.service';
import {
  sliceArgs
} from '../utils/query.utils';

/**
 * create - Essa função cria um produtor de evento na base de dados
 *
 * @function create
 * @param {object} parent Informações de um possível pai
 * @param {object} args Informações envadas na queuery ou mutation
 * @param {object} context Informações passadas no context para o apollo graphql
 */
const create = async (parent, args, {
  productors,
  users
}) => {
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

  let salesforceId = '';
  try {
    const mappedToSales = mapProducerToSales(productor);
    const auth = await getAuthorization();
    const salesForceUser = await sendToSalesForce(auth, mappedToSales);
    salesforceId = salesForceUser.id;
  } catch (err) {
    console.log('err:', err);
  }
  const mappeduser = {
    productor: productor._id
  };
  if (salesforceId) mappeduser.sales_id = salesforceId;

  await users.update({
      _id: productor.user._id
    },
    mappeduser, {
      new: true
    },
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
const update = async (parent, args, {
  productors,
  users
}) => {
  const validate = {}; // validateArtist(); fazer função de validação
  if (validate.error) throw new Error(validate.msg);

  const producer = await productors.findOneAndUpdate({
      _id: args.productor_id
    }, args.productor, {
      new: true
    })
    .populate('user')
    .populate('events')
    .populate('musical_styles')
    .populate('occupations')
    .populate('location')
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
    console.log('err:', err);
  }

  if (salesforceId) {
    await users.update({
      _id: producer.user._id
    }, {
      sales_id: salesforceId
    }, );
  };


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
const findOne = (parent, args, {
    productors
  }) => productors.findOne({
    _id: args.productor.id
  })
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
const findAll = (parent, args, {
  productors
}) => {
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

/**
 * findAll - Essa função procura e retorna vários produtores de eventos da base de dados
 *
 * @function findAll
 * @param {object} parent Informações de um possível pai
 * @param {object} args Informações envadas na queuery ou mutation
 * @param {object} context Informações passadas no context para o apollo graphql
 */
const search = async (parent, args, {
  productors, users, occupations
}) => {

  const $lookup = {
    from: 'occupations',
    as: 'occupations',
    localField: 'occupations',
    foreignField: '_id'
  }

  const $match = {
    $or: [{
        name: new RegExp(args.text, 'ig')
      },
      {
        occupations: new RegExp(args.text, 'ig')
      }
    ]
  }

  const aggregate = [];
  // aggregate.push({
  //   $lookup
  // })
  aggregate.push({
    $match
  })

  const producers = await productors.aggregate(aggregate)
    .skip(args.paginator?.skip || 0)
    .limit(args.paginator?.limit || 25);

    console.log(producers)


  await users.populate(producers, {
    path: 'user'
  });
  await occupations.populate(producers, {
    path: 'occupations'
  });

  return producers.map(producer => ({ ...producer, id: producer._id })) || [];
}

export default {
  create,
  findOne,
  findAll,
  update,
  search
};