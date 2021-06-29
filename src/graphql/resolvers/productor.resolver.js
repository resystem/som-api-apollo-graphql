import ProductorController from '../../controllers/productor.controller';

export default {
  queries: {
    oneProductor: ProductorController.findOne,
    allProductors: ProductorController.findAll,
  },
  mutations: {
    createProductor: ProductorController.create,
    updateProductor: ProductorController.update,
  },
};
