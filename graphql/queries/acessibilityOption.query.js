export default `
  oneAcessibilityOption( 
    _id: ID
  ): AcessibilityOption

  allAcessibilityOptions( 
    acessibility_option: AcessibilityOptionInput
    paginator: PaginatorInput
  ): [AcessibilityOption]
`;
