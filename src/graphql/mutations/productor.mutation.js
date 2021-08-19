export default `
  createProductor(
    productor: ProductorInput!
    ): Productor
  updateProductor(
    productor_id: ID!
    productor: ProductorInput!
    ): Productor
  populateProducersUsername: [Productor]
`;
