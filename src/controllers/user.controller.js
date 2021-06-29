import { sliceArgs } from '../utils/query.utils';

/**
  * create - Essa função cria um usuário na base de dados
  *
  * @function create
  * @param {object} parent Informações de um possível pai
  * @param {object} args Informações envadas na queuery ou mutation
  * @param {object} context Informações passadas no context para o apollo graphql
  */
const create = (parent, args, { users }) => {
  const validate = {}; // validateUser(); fazer função de validaçã
  if (validate.error) throw new Error(validate.msg);
  console.log('args: ', args);

  return users.create(args.user);
};

/**
  * update - Essa função atualiza um usuário na base de dados
  *
  * @function update
  * @param {object} parent Informações de um possível pai
  * @param {object} args Informações envadas na queuery ou mutation
  * @param {object} context Informações passadas no context para o apollo graphql
  */
const update = (parent, args, { users }) => {
  const validate = {}; // validateUser(); fazer função de validaçã
  if (validate.error) throw new Error(validate.msg);

  return users.findOneAndUpdate({ _id: args.user_id }, args.user, { new: true })
    .populate('artist')
    .populate('productor')
    .populate('productor.musical_styles')
    .populate('following_artists')
    .populate('following_productors')
    .populate('favorited_songs')
    .populate({
      path: 'productor',
      populate: ['musical_styles', 'location', 'occupations'],
    })
    .populate({
      path: 'artist',
      populate: ['musical_styles', 'location'],
    });
};

/**
  * findOne - Essa função procura e retorna um usuário na base de dados
  *
  * @function findOne
  * @param {object} parent Informações de um possível pai
  * @param {object} args Informações envadas na queuery ou mutation
  * @param {object} context Informações passadas no context para o apollo graphql
  */
const findOne = (parent, args, { users }) => {
  const options = sliceArgs(args);

  return users.findOne(options.query)
    .populate({
      path: 'artist',
      populate: [
        { path: 'user' },
        { path: 'approved_events' },
        { path: 'subscribed_events' },
        { path: 'songs' },
        { path: 'recused_events' },
        { path: 'musical_genres' },
        { path: 'musical_styles' },
        { path: 'category' },
        { path: 'follows.user' },
        { path: 'location' },
      ],
    })
    .populate('productor')
    .populate('productor.musical_styles')
    .populate('following_artists')
    .populate('following_productors')
    .populate('favorited_songs')
    .populate({
      path: 'productor',
      populate: ['musical_styles', 'location', 'occupations'],
    });
};

/**
  * findAll - Essa função procura e retorna vários usuários da base de dados
  *
  * @function findAll
  * @param {object} parent Informações de um possível pai
  * @param {object} args Informações envadas na queuery ou mutation
  * @param {object} context Informações passadas no context para o apollo graphql
  */
const findAll = (parent, args, { users }) => {
  const options = sliceArgs(args);
  return users.find(options.query)
    .populate({
      path: 'artist',
      populate: [
        { path: 'user' },
        { path: 'approved_events' },
        { path: 'subscribed_events' },
        { path: 'recused_events' },
        { path: 'musical_genres' },
        { path: 'musical_styles' },
        { path: 'lcoation' },
        { path: 'category' },
        { path: 'follows.user' },
      ],
    })
    .populate('productor')
    .populate('productor.musical_styles')
    .populate('following_artists')
    .populate('following_productors')
    .populate('favorited_songs')
    .populate({
      path: 'productor',
      populate: ['musical_styles', 'location', 'occupations'],
    });
};

export default {
  create,
  findOne,
  findAll,
  update,
};
