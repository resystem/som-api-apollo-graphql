export default `
  oneCity( 
    id: ID
  ): City

  allCities( 
    city: CityInput
    paginator: PaginatorInput
  ): [City]
`;
