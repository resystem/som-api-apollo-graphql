export default `
  type Image {
    original: String
    mimified: String
    thumbnail: String
  }
  input ImageInput {
    mimified: String
    original: String
    thumbnail: String
  }
`;
