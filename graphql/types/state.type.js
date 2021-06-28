
export default `
  type State {
    id: ID
    old_id: String
    name: String
    short_name: String
    shortName: String
    old_country_id: String
    country: Country
  }
  
  input StateInput {
    id: ID
    old_id: String
    name: String
    short_name: String
    shortName: String
    old_country_id: String
    country: ID
  }
`;
