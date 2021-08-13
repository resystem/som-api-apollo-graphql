import NewsLatterController from '../../controllers/newsLatter.controller';

export default {
  queries: {
    oneNewsLatter: NewsLatterController.findOne,
    allNewsLatters: NewsLatterController.findAll,
  },
  mutations: {
    createNewsLatter: NewsLatterController.create,
  },
};
