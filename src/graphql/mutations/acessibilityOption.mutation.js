export default `
  createAcessibilityOption(
    acessibility_option: AcessibilityOptionInput!
  ): AcessibilityOption
  
  updateAcessibilityOption(
    acessibility_option_id: ID!
    acessibility_option: AcessibilityOptionInput!
  ): AcessibilityOption
`;
