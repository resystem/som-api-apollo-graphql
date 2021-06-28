import ArtistController from '../../controllers/artist.controller';

export default {
  queries: {
    oneArtist: ArtistController.findOne,
    allArtists: ArtistController.findAll,
    searchArtists: ArtistController.searchArtists,
  },
  mutations: {
    createArtist: ArtistController.create,
    updateArtist: ArtistController.update,
    followArtist: ArtistController.follow,
    unfollowArtist: ArtistController.unfollow,
  },
};
