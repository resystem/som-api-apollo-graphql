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

  return events.findOneAndUpdate({ _id: args.event_id }, args.event, { new: true })
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

  return events.findOne({ _id: options.query.id })
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
  return events.find(options.query.event)
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
  const agregate = [];
  const firstMatch = {
    ...args.event,
  };
  if (args.musical_styles && args.musical_styles.length) {
    firstMatch.musical_styles = { $in: args.musical_styles };
  }

  const addFields = {
    event_month: { $month: '$event_date' },
    event_year: { $year: '$event_date' },
  };

  const secondMatch = {};

  if (args.years.length) {
    secondMatch.event_year = { $in: args.years };
  }

  if (args.months.length) {
    secondMatch.event_month = { $in: args.months };
  }

  agregate.push({ $match: firstMatch });
  agregate.push({ $addFields: addFields });

  if (Object.keys(secondMatch).length) agregate.push({ $match: secondMatch });

  if (args.paginator.sort) agregate.push({ $sort: args.paginator.sort });

  const myEvents = await events.aggregate(agregate)
    .skip(args.paginator.skip || 0)
    .limit(args.paginator.limit || 25);

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

  console.log(id, productorId);

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
};
