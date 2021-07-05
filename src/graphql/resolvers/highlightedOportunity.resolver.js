import HighlightedOportunityController from '../../controllers/highlightedOportunity.controller';

export default {
  queries: {
    allHighlightedOportunities: HighlightedOportunityController.findAll,
  },
  mutations: {
    createHighlightedOportunity: HighlightedOportunityController.create,
  },
};
