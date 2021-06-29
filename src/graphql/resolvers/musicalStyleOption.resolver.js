import MusicalStyleOptionController from '../../controllers/musicalStyleOption.controller';

export default {
  queries: {
    oneMusicalStyleOption: MusicalStyleOptionController.findOne,
    allMusicalStyleOptions: MusicalStyleOptionController.findAll,
  },
  mutations: {
    createMusicalStyleOption: MusicalStyleOptionController.create,
    updateMusicalStyleOption: MusicalStyleOptionController.update,
  },
};
