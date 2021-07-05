import CommunityUserController from '../../controllers/communityUser.controller';

export default {
  queries: {
    allCommunityUsers: CommunityUserController.findAll,
  },
  mutations: {
    createCommunityUser: CommunityUserController.create,
  },
};
