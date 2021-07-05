export default `
  type HighlightedOportunity {
    id: ID
    oportunity: Event
    image: String
  }
  
  input HighlightedOportunityInput {
    id: ID
    oportunity: ID
    image: String
  }
`;
