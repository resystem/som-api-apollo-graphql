import SongController from '../../controllers/song.controller';

export default {
  queries: {
    oneSong: SongController.findOne,
    allSongs: SongController.findAll,
  },
  mutations: {
    createSong: SongController.create,
    updateSong: SongController.update,
    deleteSong: SongController.deleteSong,
    favoriteSong: SongController.favoriteSong,
    unfavoriteSong: SongController.unfavoriteSong,
  },
};
