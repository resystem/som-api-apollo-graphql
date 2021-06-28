export default `
  type Country {
    id: ID
    name: String
    old_id: String
    short_name: String
    shortName: String
    pattern: String
    pattern_name: String
  }
  
  input CountryInput {
    id: ID
    old_id: String
    name: String
    short_name: String
    shortName: String
    pattern: String
    pattern_name: String
  }
`;
