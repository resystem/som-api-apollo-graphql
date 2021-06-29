export default `
  type Song {
    id: ID
    artist: Artist
    url: String
    title: String
    image: Image
    deleted: Boolean
  }
  
  input SongInput {
    id: ID
    artist: String
    url: String
    title: String
    image: ImageInput
    deleted: Boolean
  }
`;
