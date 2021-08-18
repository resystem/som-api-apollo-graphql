import ProductorController from '../../controllers/productor.controller';

export default {
  queries: {
    oneProductor: ProductorController.findOne,
    allProductors: ProductorController.findAll,
    searchProducers: ProductorController.search,
  },
  mutations: {
    createProductor: ProductorController.create,
    updateProductor: ProductorController.update,
    populateProducersUsername: ProductorController.populateUsername,
  },
};
