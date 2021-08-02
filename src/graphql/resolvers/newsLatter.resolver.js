import NewsLatterController from '../../controllers/newsLatter.controller';

export default {
  queries: {
    allNewsLatters: NewsLatterController.findAll,
  },
  mutations: {
    createNewsLatter: NewsLatterController.create,
  },
};
