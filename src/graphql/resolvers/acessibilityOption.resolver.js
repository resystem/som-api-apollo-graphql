import AcessibilityOptionController from '../../controllers/acessibilityOption.controller';

export default {
  queries: {
    oneAcessibilityOption: AcessibilityOptionController.findOne,
    allAcessibilityOptions: AcessibilityOptionController.findAll,
  },
  mutations: {
    createAcessibilityOption: AcessibilityOptionController.create,
    updateAcessibilityOption: AcessibilityOptionController.update,
  },
};
