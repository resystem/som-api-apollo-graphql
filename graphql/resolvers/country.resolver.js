import CountryController from '../../controllers/country.controller';

export default {
  queries: {
    oneCountry: CountryController.findOne,
    allCountries: CountryController.findAll,
  },
  mutations: {
    createCountry: CountryController.create,
    updateCountry: CountryController.update,
  },
};
