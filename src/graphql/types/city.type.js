export default `
  type City {
    id: ID
    old_id: String
    name: String
    old_state_id: String
    state: State
  }
  
  input CityInput {
    id: ID
    old_id: String
    name: String
    old_state_id: String
    state: ID
  }
`;
