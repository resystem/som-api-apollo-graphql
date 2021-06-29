export default `
  createCategoryOption(
    category_option: CategoryOptionInput!
  ): CategoryOption
  
    updateCategoryOption(
    category_option_id: ID!
    category_option: CategoryOptionInput!
  ): CategoryOption
`;
