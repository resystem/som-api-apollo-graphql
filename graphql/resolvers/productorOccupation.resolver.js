import ProductorOccupationController from '../../controllers/productorOccupation.controller';

export default {
  queries: {
    oneProductorOccupation: ProductorOccupationController.findOne,
    allProductorOccupations: ProductorOccupationController.findAll,
  },
  mutations: {
    createProductorOccupation: ProductorOccupationController.create,
  },
};
