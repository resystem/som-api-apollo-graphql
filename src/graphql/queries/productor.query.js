export default `
  oneProductor( 
    username: String
    id: ID
  ): Productor

  allProductors( 
    productor: ProductorInput
    paginator: PaginatorInput
  ): [Productor]

  searchProducers(
    text: String!
  ): [Productor]
`;
