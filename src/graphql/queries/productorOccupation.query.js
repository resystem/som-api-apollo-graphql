export default `
  oneProductorOccupation( 
    id: ID!
  ): ProductorOccupation

  allProductorOccupations(
    occupation: ProductorOccupationInput
  ): [ProductorOccupation]
`;
