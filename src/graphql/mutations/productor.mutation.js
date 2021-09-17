export default `
  createProductor(
    productor: ProductorInput!
  ): Productor

  updateProductor(
    productor_id: ID!
    productor: ProductorInput!
  ): Productor

  followProductor(
    id: String!
    user_id: String!
  ): Productor

  unfollowProductor(
    id: String!
    user_id: String!
  ): Productor

  populateProducersUsername: [Productor]
`;
