import StateController from '../../controllers/state.controller';

export default {
  queries: {
    oneState: StateController.findOne,
    allStates: StateController.findAll,
  },
  mutations: {
    createState: StateController.create,
    updateState: StateController.update,
  },
};
