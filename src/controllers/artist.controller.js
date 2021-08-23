import { getAuthorization, mapArtistToSales, sendToSalesForce } from '../services/salesforce.service';
import { sliceArgs } from '../utils/query.utils';
import { getRandomCode } from '../utils/random.utils';

/**
  * create - Essa função cria um artista na base de dados
  *
  * @function create
  * @param {object} parent Informações de um possível pai
  * @param {object} args Informações envadas na queuery ou mutation
  * @param {object} context Informações passadas no context para o apollo graphql
  */
const create = async (parent, args, { artists, users }) => {
  const validate = {}; // validateArtist(); fazer função de validação
  if (validate.error) throw new Error(validate.msg);

  let artist;

  try {
    artist = await artists.findOne({ username: args.artist.username });
    if (artist) throw new Error('invalid/username');

    artist = await artists.create(args.artist);
    artist = await artist.populate('location')
      .populate('musical_styles')
      .populate('songs')
      .populate('user')
      .execPopulate();
  } catch (err) {
    console.log('err:', err);
    throw err;
  }

  let salesforceId = '';
  try {
    const mappedToSales = mapArtistToSales(artist);
    const auth = await getAuthorization();
    const salesForceUser = await sendToSalesForce(auth, mappedToSales);
    salesforceId = salesForceUser.id;
  } catch (err) {
    console.log('err:', err);
  }
  const mappeduser = { artist: artist._id };
  if (salesforceId) mappeduser.sales_id = salesforceId;

  try {
    await users.findOneAndUpdate(
      { _id: artist.user._id },
      mappeduser,
      { new: true },
    );
  } catch (err) {
    console.log('err:', err);
    throw err;
  }

  return artist;
};

/**
  * update - Essa função atualiza um artista na base de dados
  *
  * @function update
  * @param {object} parent Informações de um possível pai
  * @param {object} args Informações envadas na queuery ou mutation
  * @param {object} context Informações passadas no context para o apollo graphql
  */
const update = async (parent, args, { artists, users }) => {
  const validate = {}; // validateArtist(); fazer função de validação
  if (validate.error) throw new Error(validate.msg);
  
  const verify = await artists.findOne({ username: args.artist.username });
  if (verify && verify._id.toString() !== args.artist_id) throw new Error('invalid/username');

  const artist = await artists.findOneAndUpdate({ _id: args.artist_id }, args.artist, { new: true })
    // .populate('approved_events')
    // .populate('subscribed_events')
    // .populate('recused_events')
    .populate('songs')
    .populate('musical_styles')
    .populate('location')
    .populate('user')
    .then(resp => resp)
    .catch((err) => {
      throw new Error(err);
    });

  let salesforceId = '';
  try {
    const mappedToSales = mapArtistToSales(artist);
    const auth = await getAuthorization();
    const salesForceUser = await sendToSalesForce(auth, mappedToSales);
    salesforceId = salesForceUser.id;
  } catch (err) {
    console.log('err:', err);
  }
  if (salesforceId) {
    try {
      await users.findOneAndUpdate(
        { _id: artist.user._id },
        { sales_id: salesforceId },
        { new: true },
      );
    } catch (err) {
      console.log('err:', err);
    }
  }
  return artist;
};

/**
  * findOne - Essa função procura e retorna um artista na base de dados
  *
  * @function findOne
  * @param {object} parent Informações de um possível pai
  * @param {object} args Informações envadas na queuery ou mutation
  * @param {object} context Informações passadas no context para o apollo graphql
  */
const findOne = (parent, args, { artists }) => artists
  .findOne({ username: args.username })
  .populate('user')
  .populate({
    path: 'user',
    populate: ['following_artists', 'following_productors'],
  })
  .populate('approved_events')
  .populate('subscribed_events')
  .populate('recused_events')
  .populate('musical_genres')
  .populate('location')
  .populate('songs')
  .populate('musical_styles')
  .populate('category')
  .populate('follows.user')
  .then(resp => resp)
  .catch((err) => {
    throw new Error(err);
  });

/**
  * searchArtists - Essa função procura e retorna vários artistas da base de dados
  *
  * @function searchArtists
  * @param {object} parent Informações de um possível pai
  * @param {object} args Informações envadas na queuery ou mutation
  * @param {object} context Informações passadas no context para o apollo graphql
  */
const searchArtists = (parent, args, { artists }) => artists.find(args.artist)
  .skip(args.paginator.skip)
  .limit(args.paginator.limit)
  .populate('user')
  .populate('approved_events')
  .populate('subscribed_events')
  .populate('location')
  .populate('recused_events')
  .populate('musical_genres')
  .populate('musical_styles')
  .populate('category')
  .populate('follows.user')
  .then(resp => resp)
  .catch((err) => {
    throw new Error(err);
  });

/**
  * findAll - Essa função procura e retorna vários artistas da base de dados
  *
  * @function findAll
  * @param {object} parent Informações de um possível pai
  * @param {object} args Informações envadas na queuery ou mutation
  * @param {object} context Informações passadas no context para o apollo graphql
  */
const findAll = (parent, args, { artists }) => {
  const options = sliceArgs(args);
  return artists.find(options.query.artist)
    .populate('user')
    .populate('approved_events')
    .populate('subscribed_events')
    .populate('recused_events')
    .populate('musical_genres')
    .populate('musical_styles')
    .populate('location')
    .populate('category')
    .populate('follows.user')
    .then(resp => resp)
    .catch((err) => {
      throw new Error(err);
    });
};

/**
  * follow - Essa função segue um artist
  *
  * @function follow
  * @param {object} parent Informações de um possível pai
  * @param {object} args Informações envadas na queuery ou mutation
  * @param {object} context Informações passadas no context para o apollo graphql
  */
const follow = async (parent, args, { artists, users }) => {
  const { artist, user } = args;
  await users.findOneAndUpdate(
    { _id: user },
    {
      $push: { following_artists: artist },
    },
    { new: true },
  );
  return artists.findOneAndUpdate({ _id: artist }, { follows: { user } }, { new: true })
    .populate('user')
    .populate('approved_events')
    .populate('subscribed_events')
    .populate('recused_events')
    .populate('musical_styles')
    .populate('musical_genres')
    .populate('location')
    .populate('category')
    .populate('follows.user')
    .populate('following_artists')
    .populate('following_productors')
    .then(resp => resp)
    .catch((err) => {
      throw new Error(err);
    });
};

/**
  * unfollow - Essa função deixa de seguir um artist
  *
  * @function follow
  * @param {object} parent Informações de um possível pai
  * @param {object} args Informações envadas na queuery ou mutation
  * @param {object} context Informações passadas no context para o apollo graphql
  */
const unfollow = async (parent, args, { artists, users }) => {
  try {
    const { artist, user } = args;
    await users.findOneAndUpdate(
      { _id: user },
      {
        $pull: { following_artists: artist },
      },
      { new: true },
    );

    const myartist = await artists.findOneAndUpdate(
      { _id: artist },
      { $pull: { follows: { user } } },
      { new: true },
    )
      .populate('user')
      .populate('approved_events')
      .populate('subscribed_events')
      .populate('recused_events')
      .populate('musical_styles')
      .populate('musical_genres')
      .populate('location')
      .populate('category')
      .populate('follows.user')
      .then(resp => resp)
      .catch((err) => {
        throw new Error(err);
      });

    return myartist;
  } catch (err) {
    throw err;
  }
};

/**
  * searchArtists - Essa função procura e retorna vários artistas da base de dados
  *
  * @function searchArtists
  * @param {object} parent Informações de um possível pai
  * @param {object} args Informações envadas na queuery ou mutation
  */
 const search = async (parent, args, {
  artists, musicalStyleOptions, users
}) => {

  const $lookup = {
    from: musicalStyleOptions.collection.name,
    as: 'musicalStyleObjects',
    localField: 'musical_styles',
    foreignField: '_id'
  }

  const $match = {
    $or: [{
        name: new RegExp(args.text, 'ig')
      },
      {
        'musicalStyleObjects.name': new RegExp(args.text, 'ig')
      }
    ]
  }

  const aggregate = [];
  
  aggregate.push({
    $lookup
  })

  aggregate.push({
    $match
  })

  const artistsResponse = await artists.aggregate(aggregate)
    .skip(args.paginator?.skip || 0)
    .limit(args.paginator?.limit || 25);

  await users.populate(artistsResponse, {
    path: 'user'
  });
  await musicalStyleOptions.populate(artistsResponse, {
    path: 'musical_styles'
  });

  return artistsResponse.map(artist => ({ ...artist, id: artist._id })) || [];
}
/**
  * populateUsername - Essa função procura e retorna vários produtores de eventos da base de dados
  *
  * @function populateUsername
  * @param {object} parent Informações de um possível pai
  * @param {object} args Informações envadas na queuery ou mutation
  * @param {object} context Informações passadas no context para o apollo graphql
  */
const populateUsername = async (parent, args, { artists }) => {
  const allArtsts = await artists.find({ username: { $exists: false} })
  const requests = allArtsts.map((a) => new Promise(async (res, rej) => {
    const artist = await artists.findOneAndUpdate({ _id: a._id }, { username: getRandomCode(6) },  { new: true });
    console.log('🚀 ~ artist', artist.username);
    return {
      ...artist,
      id: artist._id,
    }
  }));
  return await Promise.all(requests);
};


export default {
  create,
  findOne,
  findAll,
  update,
  searchArtists,
  follow,
  unfollow,
  search,
  populateUsername
};
