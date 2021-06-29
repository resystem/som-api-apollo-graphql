export default `
  type Location {
    id: ID!
    address: String
    complement: String
    district: String
    city: String
    number: String
    zipcode: String
    state: String
    country: String
    place_id: String
    geometry: JSON
  }
  
  input LocationInput {
    address: String
    complement: String
    district: String
    city: String
    country: String
    number: String
    zipcode: String
    state: String
    place_id: String
    geometry: JSON
  }
`;
