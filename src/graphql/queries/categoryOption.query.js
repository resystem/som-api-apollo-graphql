export default `
  oneCategoryOption( 
    _id: ID!
  ): CategoryOption

  allCategoryOptions( 
    category_option: CategoryOptionInput
    paginator: PaginatorInput
  ): [CategoryOption]
`;
