import CityController from '../../controllers/city.controller';

export default {
  queries: {
    oneCity: CityController.findOne,
    allCities: CityController.findAll,
  },
  mutations: {
    createCity: CityController.create,
    updateCity: CityController.update,
  },
};
