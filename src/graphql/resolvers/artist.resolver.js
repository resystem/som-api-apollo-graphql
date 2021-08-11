import ArtistController from '../../controllers/artist.controller';

export default {
  queries: {
    oneArtist: ArtistController.findOne,
    allArtists: ArtistController.findAll,
    searchArtists: ArtistController.searchArtists,
    newSearchArtists: ArtistController.search
  },
  mutations: {
    createArtist: ArtistController.create,
    updateArtist: ArtistController.update,
    followArtist: ArtistController.follow,
    unfollowArtist: ArtistController.unfollow,
  },
};
