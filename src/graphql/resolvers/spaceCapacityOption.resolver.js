import SpaceCapacityOptionController from '../../controllers/spaceCapacityOption.controller';

export default {
  queries: {
    oneSpaceCapacityOption: SpaceCapacityOptionController.findOne,
    allSpaceCapacityOptions: SpaceCapacityOptionController.findAll,
  },
  mutations: {
    createSpaceCapacityOption: SpaceCapacityOptionController.create,
    updateSpaceCapacityOption: SpaceCapacityOptionController.update,
  },
};
