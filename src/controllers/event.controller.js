import { sliceArgs } from '../utils/query.utils';

/**
  * create - Essa função cria um evento na base de dados
  *
  * @function create
  * @param {object} parent Informações de um possível pai
  * @param {object} args Informações envadas na queuery ou mutation
  * @param {object} context Informações passadas no context para o apollo graphql
  */
const create = async (parent, args, { events, productors }) => {
  const validate = {}; // validateEvent(); fazer função de validação
  if (validate.error) throw new Error(validate.msg);

  const event = await events.create(args.event)
    .then(resp => resp
      .populate('approved_productors')
      .populate('reproved_productors')
      .populate('approved_artists')
      .populate('reproved_artists')
      .populate({
        path: 'productor',
        populate: {
          path: 'location',
        },
      })
      .populate('location')
      .populate('subscribed_productors')
      .populate('subscribers')
      .execPopulate());

  await productors.findOneAndUpdate(
    { _id: event.productor },
    { $push: { events: event._id } },
  );

  return event;
};

/**
  * update - Essa função atualiza um evento de evento na base de dados
  *
  * @function update
  * @param {object} parent Informações de um possível pai
  * @param {object} args Informações envadas na queuery ou mutation
  * @param {object} context Informações passadas no context para o apollo graphql
  */
const update = (parent, args, { events }) => {
  const validate = {}; // validateArtist(); fazer função de validação
  if (validate.error) throw new Error(validate.msg);

  return events.findOneAndUpdate({ _id: args.id, deleted: false }, args.event, { new: true })
    .populate('approved_productors')
    .populate('reproved_productors')
    .populate('approved_artists')
    .populate('reproved_artists')
    .populate({
      path: 'productor',
      populate: {
        path: 'location',
      },
    })
    .populate('location')
    .populate('subscribed_productors')
    .populate('subscribers')
    .then(resp => resp)
    .catch((err) => {
      throw new Error(err);
    });
};

/**
  * findOne - Essa função procura e retorna um evento base de dados
  *
  * @function findOne
  * @param {object} parent Informações de um possível pai
  * @param {object} args Informações envadas na queuery ou mutation
  * @param {object} context Informações passadas no context para o apollo graphql
  */
const findOne = (parent, args, { events }) => {
  const options = sliceArgs(args);

  return events.findOne({
    $or: [
      { _id: options.query.id, deleted: { $exists: true },  deleted: false },
      { _id: options.query.id, deleted: { $exists: false } },
    ],
  })
    .populate('approved_productors')
    .populate('reproved_productors')
    .populate('approved_artists')
    .populate('reproved_artists')
    .populate({
      path: 'productor',
      populate: {
        path: 'location',
      },
    })
    .populate('location')
    .populate('subscribed_productors')
    .populate('subscribers')
    .then(resp => resp)
    .catch((err) => {
      throw new Error(err);
    });
};

/**
  * findAll - Essa função procura e retorna vários eventos da base de dados
  *
  * @function findAll
  * @param {object} parent Informações de um possível pai
  * @param {object} args Informações envadas na queuery ou mutation
  * @param {object} context Informações passadas no context para o apollo graphql
  */
const findAll = (parent, args, { events }) => {
  const options = sliceArgs(args);
  return events.find({
    $or: [
      { ...options.query.event, deleted: { $exists: true },  deleted: false },
      { ...options.query.event, deleted: { $exists: false } },
    ],
  })
    .sort(options.paginator.sort || {})
    .limit(options.paginator.limit || 0)
    .populate('approved_productors')
    .populate('reproved_productors')
    .populate('approved_artists')
    .populate('reproved_artists')
    .populate({
      path: 'productor',
      populate: {
        path: 'location',
      },
    })
    .populate('location')
    .populate('subscribed_productors')
    .populate('subscribers')
    .then(resp => resp)
    .catch((err) => {
      throw new Error(err);
    });
};

/**
 * 
 * @param {} parent 
 * @param {} args 
 * @param {} param2 
 * @returns 
 */
const remove = async (parent, args, { events, productors }) => {
  const event = await events.findOneAndUpdate(
    { _id: args.id },
    {
      deleted: true,
      subscribers: [],
      subscribed_productors: [],
      approved_artists: [],
      reproved_artists: [],
      approved_productors: [],
      reproved_productors: [],
    },
    { new: true },
  );
  if (!event) throw new Error('Event not found');
  
  const promises = [];

  event.approved_artists.forEach((_id) => {
    promises.push(artists.findOneAndUpdate({ _id }, { $pull: { approved_events: event._id } }))   
  });

  event.subscribers.forEach((_id) => {
    promises.push(artists.findOneAndUpdate({ _id }, { $pull: { subscribed_events: event._id } }))   
  });

  event.reproved_artists.forEach((_id) => {
    promises.push(artists.findOneAndUpdate({ _id }, { $pull: { recused_events: event._id } }))  
  });

  event.subscribed_productors.forEach((_id) => {
    promises.push(productors.findOneAndUpdate({ _id }, { $pull: { subscribed_oportunities: event._id } }))   
  });

  await Promise.all(promises);
  await productors.findOneAndUpdate({ _id: event.productor }, { $pull: { events: event._id } });
  return event;
}

/**
  * Essa função procura e retorna os ultimos eventos da base de dados
  * para artistas
  * @function findLastPostedToArtist
  * @param {object} parent Informações de um possível pai
  * @param {object} args Informações envadas na queuery ou mutation
  * @param {object} context Informações passadas no context para o apollo graphql
  */
const findLastPostedToArtist = (parent, args, { events }) => events.find({
  $or: [
    { is_to_artist: true, deleted: { $exists: true },  deleted: false },
    { is_to_artist: true, deleted: { $exists: false } },
  ],
})
  .sort({ created_at: -1 })
  .populate('approved_productors')
  .populate('reproved_productors')
  .populate('approved_artists')
  .populate('reproved_artists')
  .populate({
    path: 'productor',
    populate: {
      path: 'location',
    },
  })
  .populate('location')
  .populate('subscribed_productors')
  .populate('subscribers')
  .then(resp => resp)
  .catch((err) => {
    throw new Error(err);
  });

/**
* Essa função procura e retorna os ultimos eventos da base de dados
* para produtores
* @function findLastPostedToArtist
* @param {object} parent Informações de um possível pai
* @param {object} args Informações envadas na queuery ou mutation
* @param {object} context Informações passadas no context para o apollo graphql
*/
const findLastPostedToProductor = (parent, args, { events }) => events
  .find({ 
    $or: [
      { is_to_productor: true, deleted: { $exists: true },  deleted: false },
      { is_to_productor: true, deleted: { $exists: false } },
    ],
  })
  .sort({ created_at: -1 })
  .populate('approved_productors')
  .populate('reproved_productors')
  .populate('approved_artists')
  .populate('reproved_artists')
  .populate({
    path: 'productor',
    populate: {
      path: 'location',
    },
  })
  .populate('location')
  .populate('subscribed_productors')
  .populate('subscribers')
  .then(resp => resp)
  .catch((err) => {
    throw new Error(err);
  });

/**
  * search - Essa função procura e retorna vários eventos da base de dados
  *
  * @function search
  * @param {object} parent Informações de um possível pai
  * @param {object} args Informações envadas na queuery ou mutation
  * @param {object} context Informações passadas no context para o apollo graphql
  */
const search = async (parent, args, {
  events,
  artists,
  productors,
  locations,
}) => {
  const aggregate = [];
  const firstMatch = {
    $or: [
      { ...args.event, deleted: { $exists: true },  deleted: false },
      { ...args.event, deleted: { $exists: false } },
    ],
  };
  if (args.musical_styles && args.musical_styles.length) {
    firstMatch.musical_styles = { $in: args.musical_styles };
  }

  const addFields = {
    event_month: { $month: '$event_date' },
    event_year: { $year: '$event_date' },
  };

  const secondMatch = {};

  if (args.years?.length) {
    secondMatch.event_year = { $in: args.years };
  }

  if (args.months?.length) {
    secondMatch.event_month = { $in: args.months };
  }
  
  if (args.text?.length) {
    const textMatch = [
      { name: new RegExp(args.text, 'ig') },
      { 'musical_styles.name': new RegExp(args.text, 'ig') }
    ];
    secondMatch.$or = textMatch; 
  }

  aggregate.push({ $addFields: addFields });
  aggregate.push({ $match: firstMatch });

  if (args.text) aggregate.push({ $lookup: { from: 'musical_styles', as: 'tags', localField: 'musical_styles', foreignField: '_id' } });

  if (Object.keys(secondMatch).length) aggregate.push({ $match: secondMatch });

  if (args.paginator?.sort) aggregate.push({ $sort: args.paginator.sort });

  console.log(aggregate[1])

  const myEvents = await events.aggregate(aggregate)
    .skip(args.paginator?.skip || 0)
    .limit(args.paginator?.limit || 25);

  await artists.populate(myEvents, { path: 'approved_artists' });
  await productors.populate(myEvents, { path: 'productor', populate: { path: 'location' } });
  await locations.populate(myEvents, { path: 'location' });
  await artists.populate(myEvents, { path: 'subscribers' });
  await artists.populate(myEvents, { path: 'reproved_artists' });


  return myEvents.map(evt => ({ ...evt, id: evt._id })) || [];
};

/**
  * subscribe - Essa função adiciona artista aos inscritos
  *
  * @function subscribe
  * @param {object} parent Informações de um possível pai
  * @param {object} args Informações envadas na queuery ou mutation
  * @param {object} context Informações passadas no context para o apollo graphql
  */
const subscribe = async (parent, args, { events, artists }) => {
  const { id, artistID } = args;
  const event = await events.findOne({ _id: id });
  const myEvent = JSON.parse(JSON.stringify(event));
  const subscribers = myEvent.subscribers.filter(sbs => sbs !== artistID);
  subscribers.push(artistID);

  await artists.findOneAndUpdate({ _id: artistID }, { $push: { subscribed_events: id } });

  return events.findOneAndUpdate({ _id: id }, { subscribers }, { new: true })
    .populate('approved_productors')
    .populate('reproved_productors')
    .populate('approved_artists')
    .populate('reproved_artists')
    .populate({
      path: 'productor',
      populate: {
        path: 'location',
      },
    })
    .populate('location')
    .populate('subscribed_productors')
    .populate('subscribers');
};


/**
  * subscribeProductor - Essa função adiciona um produtor aos inscritos
  *
  * @function subscribe
  * @param {object} parent Informações de um possível pai
  * @param {object} args Informações envadas na queuery ou mutation
  * @param {object} context Informações passadas no context para o apollo graphql
  */
const subscribeProductor = async (parent, args, { events, productors }) => {
  const { id, productor_id: productorId } = args;

  const event = await events.findOne({ _id: id });
  const parsedEvent = JSON.parse(JSON.stringify(event));

  const subscribers = parsedEvent.subscribers.filter(sbs => sbs !== productorId);
  subscribers.push(productorId);

  await productors
    .findOneAndUpdate({ _id: productorId }, { $push: { subscribed_oportunities: id } });

  return events.findOneAndUpdate({ _id: id }, { subscribed_productors: subscribers }, { new: true })
    .populate('approved_productors')
    .populate('reproved_productors')
    .populate('approved_artists')
    .populate('reproved_artists')
    .populate({
      path: 'productor',
      populate: {
        path: 'location',
      },
    })
    .populate('location')
    .populate('subscribed_productors')
    .populate('subscribers');
};

/**
  * unsubscribe - Essa função remove artista aos inscritos
  *
  * @function unsubscribe
  * @param {object} parent Informações de um possível pai
  * @param {object} args Informações envadas na queuery ou mutation
  * @param {object} context Informações passadas no context para o apollo graphql
  */
const unsubscribe = async (parent, args, { events, artists }) => {
  const { id, artistID } = args;
  await artists.findOneAndUpdate({ _id: artistID }, { $pull: { subscribed_events: id } });
  return events.findOneAndUpdate({ _id: id }, {
    $pull: {
      subscribers: artistID,
      reproved_artists: artistID,
      approved_artists: artistID,
    },
  }, { new: true })
    .populate('approved_productors')
    .populate('reproved_productors')
    .populate('approved_artists')
    .populate('reproved_artists')
    .populate({
      path: 'productor',
      populate: {
        path: 'location',
      },
    })
    .populate('location')
    .populate('subscribed_productors')
    .populate('subscribers');
};

/**
  * unsubscribe - Essa função remove artista aos inscritos
  *
  * @function unsubscribe
  * @param {object} parent Informações de um possível pai
  * @param {object} args Informações envadas na queuery ou mutation
  * @param {object} context Informações passadas no context para o apollo graphql
  */
const unsubscribeProductor = async (parent, args, { events, productors }) => {
  const { id, productor_id: productorId } = args;

  await productors
    .findOneAndUpdate({ _id: productorId }, { $pull: { subscribed_oportunities: id } });

  return events.findOneAndUpdate({ _id: id }, {
    $pull: {
      subscribed_productors: productorId,
      reproved_productors: productorId,
      approved_productors: productorId,
    },
  }, { new: true })
    .populate('approved_productors')
    .populate('reproved_productors')
    .populate('approved_artists')
    .populate('reproved_artists')
    .populate({
      path: 'productor',
      populate: {
        path: 'location',
      },
    })
    .populate('location')
    .populate('subscribed_productors')
    .populate('subscribers');
};

const aprove = async (parent, args, { events, artists }) => {
  const event = await events.findOneAndUpdate(
    {
      _id: args.event_id,
    }, {
      $pull: { subscribers: args.artist_id },
      $push: { approved_artists: args.artist_id },
    },
  ).populate('approved_productors')
    .populate('reproved_productors')
    .populate('approved_artists')
    .populate('reproved_artists')
    .populate({
      path: 'productor',
      populate: {
        path: 'location',
      },
    })
    .populate('location')
    .populate('subscribed_productors')
    .populate('subscribers');
  await artists.findOneAndUpdate(
    { _id: args.artst_id },
    { $push: { approved_events: args.event_id } },
  );
  return event;
};

const reprove = async (parent, args, { events, artists }) => {
  const event = await events.findOneAndUpdate(
    { _id: args.event_id },
    {
      $pull: { subscribers: args.artist_id },
      $push: { reproved_artists: args.artist_id },
    },
  ).populate('approved_artists')
    .populate('reproved_artists')
    .populate({
      path: 'productor',
      populate: {
        path: 'location',
      },
    })
    .populate('location')
    .populate('subscribed_productors')
    .populate('subscribers');
  await artists.findOneAndUpdate(
    { _id: args.artst_id },
    { $push: { recused_events: args.event_id } },
  );
  return event;
};

const resetSubscription = async (parent, args, { events, artists }) => {
  const event = await events.findOneAndUpdate(
    { _id: args.event_id },
    {
      $pull: {
        reproved_artists: args.artist_id,
        approved_artists: args.artist_id,
      },
      $push: { subscribers: args.artist_id },
    },
  ).populate('approved_artists')
    .populate('reproved_artists')
    .populate({
      path: 'productor',
      populate: {
        path: 'location',
      },
    })
    .populate('location')
    .populate('subscribed_productors')
    .populate('subscribers');

  await artists.findOneAndUpdate(
    { _id: args.artst_id },
    {
      $pull: {
        recused_events: args.event_id,
        approved_events: args.event_id,
      },
    },
  );

  return event;
};

export default {
  create,
  remove,
  findOne,
  findAll,
  update,
  unsubscribe,
  subscribe,
  subscribeProductor,
  search,
  aprove,
  reprove,
  resetSubscription,
  unsubscribeProductor,
  findLastPostedToProductor,
  findLastPostedToArtist,
};
