export default `
  createProductor(
    productor: ProductorInput!
    ): Productor
  updateProductor(
    productor_id: ID!
    productor: ProductorInput!
    ): Productor
  followProductor(
    productor: ID!,
    user: ID!
  ) : Productor
  unfollowProductor(
    productor: ID!,
    user: ID!
  ) : Productor
`;
