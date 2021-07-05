export default `
  type New {
    id: ID
    uri: String
    title: String
    description: String
    image_uri: String
    tags: [String]
  }
  
  input NewInput {
    id: ID
    uri: String
    title: String
    description: String
    image_uri: String
    tags: [String]
  }
`;
