import CategoryOptionController from '../../controllers/categoryOption.controller';

export default {
  queries: {
    oneCategoryOption: CategoryOptionController.findOne,
    allCategoryOptions: CategoryOptionController.findAll,
  },
  mutations: {
    createCategoryOption: CategoryOptionController.create,
    updateCategoryOption: CategoryOptionController.update,
  },
};
