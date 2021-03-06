export default `

  type User {
    id: ID
    ida: String
    type: String
    isAdmin: Boolean
    productor: Productor
    artist: Artist
    following_artists: [Artist]
    favorited_songs: [Song]
    following_productors: [Productor]
    likes: [User]
  }
  
  input UserInput {
    id: ID
    ida: String
    type: String
    isAdmin: Boolean
    productor: String
    artist: String
    likes: [String]
  }
`;
