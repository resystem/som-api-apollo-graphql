export default `
  createSpaceCapacityOption(
    space_capacity_option: SpaceCapacityOptionInput!
  ): SpaceCapacityOption
  
  updateSpaceCapacityOption(
    space_capacity_option_id: ID!
    space_capacity_option: SpaceCapacityOptionInput!
  ): SpaceCapacityOption
`;
