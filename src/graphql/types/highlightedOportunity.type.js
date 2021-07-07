export default `
  type HighlightedOportunity {
    id: ID
    oportunity: Event
    image: String
    mobile_image: String
    link: String
  }
  
  input HighlightedOportunityInput {
    id: ID
    oportunity: ID
    image: String
    mobile_image: String
    link: String
  }
`;
