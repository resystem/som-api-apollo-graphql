export default `
  oneSpaceCapacityOption( 
    _id: ID!
  ): SpaceCapacityOption

  allSpaceCapacityOptions( 
    space_capacity_option: SpaceCapacityOptionInput
    paginator: PaginatorInput
  ): [SpaceCapacityOption]
`;
