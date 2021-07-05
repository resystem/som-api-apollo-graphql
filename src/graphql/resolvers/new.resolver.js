import NewController from '../../controllers/new.controller';

export default {
  queries: {
    allNews: NewController.findAll,
  },
  mutations: {
    createNew: NewController.create,
  },
};
