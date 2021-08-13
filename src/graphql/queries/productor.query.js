export default `
  oneProductor( 
    productor: ProductorInput
  ): Productor

  allProductors( 
    productor: ProductorInput
    paginator: PaginatorInput
  ): [Productor]

  searchProducers(
    text: String!
  ): [Productor]
`;
