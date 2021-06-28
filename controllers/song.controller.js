import { sliceArgs } from '../utils/query.utils';

/**
  * create - Essa função cria uma opção de acessibilidade na base de dados
  *
  * @function create
  * @param {object} parent Informações de um possível pai
  * @param {object} args Informações envadas na queuery ou mutation
  * @param {object} context Informações passadas no context para o apollo graphql
  */
const create = async (parent, args, { songs, artists }) => {
  const validate = {}; // validateAcessibilityOption(); fazer função de validação
  if (validate.error) throw new Error(validate.msg);

  const song = await songs.create(args.song)
    .then(resp => resp)
    .catch((err) => {
      throw new Error(err);
    });

  await artists.findOneAndUpdate(
    { _id: args.song.artist },
    { $push: { songs: song._id } },
  );
  return song;
};

/**
  * update - Essa função atualiza uma opção de acessibilidade.
  *
  * @function update
  * @param {object} parent Informações de um possível pai
  * @param {object} args Informações envadas na queuery ou mutation
  * @param {object} context Informações passadas no context para o apollo graphql
  */
const update = (parent, args, { songs }) => {
  const validate = {}; // validateAcessibilityOption(); fazer função de validação
  if (validate.error) throw new Error(validate.msg);

  return songs.findOneAndUpdate(
    { _id: args.song_id },
    args.song,
    { new: true },
  )
    .then(resp => resp)
    .catch((err) => {
      throw new Error(err);
    });
};

/**
  * deleteSong - Essa função deleta uma musica.
  *
  * @function update
  * @param {object} parent Informações de um possível pai
  * @param {object} args Informações envadas na queuery ou mutation
  * @param {object} context Informações passadas no context para o apollo graphql
  */
const deleteSong = async (parent, args, { songs, artists }) => {
  const validate = {}; // validateAcessibilityOption(); fazer função de validação
  if (validate.error) throw new Error(validate.msg);

  const song = await songs.findOneAndUpdate(
    { _id: args.song_id },
    { deleted: true },
    { new: true },
  );

  await artists.findOneAndUpdate(
    { _id: song.artist },
    { $pull: { songs: args.song_id } },
    { new: true },
  );
  return {};
};

/**
  * favoriteSong - Essa função favorita uma musica.
  *
  * @function update
  * @param {object} parent Informações de um possível pai
  * @param {object} args Informações enviadas na query ou mutation
  * @param {object} context Informações passadas no context para o apollo graphql
  */
const favoriteSong = async (parent, args, { users }) => users.findOneAndUpdate(
  { _id: args.user_id },
  { $push: { favorited_songs: args.song_id } },
  { new: true },
);

/**
  * unfavoriteSong - Essa função desfavorita uma musica.
  *
  * @function update
  * @param {object} parent Informações de um possível pai
  * @param {object} args Informações enviadas na query ou mutation
  * @param {object} context Informações passadas no context para o apollo graphql
  */
const unfavoriteSong = async (parent, args, { users }) => users.findOneAndUpdate(
  { _id: args.user_id },
  { $pull: { favorited_songs: args.song_id } },
  { new: true },
);

/**
  * findOne - Essa função procura e returna uma opção de acessibilidade.
  *
  * @function findOne
  * @param {object} parent Informações de um possível pai
  * @param {object} args Informações envadas na queuery ou mutation
  * @param {object} context Informações passadas no context para o apollo graphql
  */
const findOne = (parent, args, { songs }) => {
  const options = sliceArgs(args);

  return songs.findOne({ ...options.query, deleted: false })
    .then(resp => resp)
    .catch((err) => {
      throw new Error(err);
    });
};

/**
  * findAll - Essa função procura e retorna varias musicas.
  *
  * @function findAll
  * @param {object} parent Informações de um possível pai
  * @param {object} args Informações envadas na queuery ou mutation
  * @param {object} context Informações passadas no context para o apollo graphql
  */
const findAll = (parent, args, { songs }) => {
  const options = sliceArgs(args);
  return songs.find({ ...options.query.song, deleted: false })
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
  deleteSong,
  favoriteSong,
  unfavoriteSong,
};
