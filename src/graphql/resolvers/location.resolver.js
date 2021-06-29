import LocationController from '../../controllers/location.controller';

export default {
  queries: {},
  mutations: {
    createLocation: LocationController.create,
    updateLocation: LocationController.update,
  },
};
