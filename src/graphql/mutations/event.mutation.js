export default `
  createEvent(
    event: EventInput!
  ): Event

  updateEvent(
    id: String!
    event: EventInput!
  ): Event

  subscribeEvent(
    id: String!,
    artistID: String!,
  ): Event

  subscribeProductorOnEvent(
    id: String!,
    productor_id: String!,
  ): Event

  unsubscribeEvent(
    id: String!,
    artistID: String!,
  ): Event

  unsubscribeProductorOnEvent(
    id: String!,
    productor_id: String!,
  ): Event

  aproveArtist(
    event_id: String!,
    artist_id: String!,
  ): Event

  reproveArtist(
    event_id: String!,
    artist_id: String!,
  ): Event

  resetSubscriptionEvent(
    event_id: String!,
    artist_id: String!,
  ): Event
`;
