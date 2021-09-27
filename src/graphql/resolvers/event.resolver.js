import EventController from '../../controllers/event.controller';

export default {
  queries: {
    oneEvent: EventController.findOne,
    allEvents: EventController.findAll,
    searchEvents: EventController.search,
    allEventToArtist: EventController.findLastPostedToArtist,
    allEventToProductor: EventController.findLastPostedToProductor,
  },
  mutations: {
    createEvent: EventController.create,
    updateEvent: EventController.update,
    subscribeEvent: EventController.subscribe,
    subscribeProductorOnEvent: EventController.subscribeProductor,
    unsubscribeEvent: EventController.unsubscribe,
    unsubscribeProductorOnEvent: EventController.unsubscribeProductor,
    aproveArtist: EventController.aprove,
    aproveProducer: EventController.aproveProducer,
    reproveArtist: EventController.reprove,
    reproveProducer: EventController.reproveProducer,
    resetSubscriptionEvent: EventController.resetSubscription,
    resetProducerSubscriptionEvent: EventController.resetProducerSubscription,
    removeOpportunity: EventController.remove,
  },
};
