export default `
  createArtist(
    artist: ArtistInput!
  ): Artist

  updateArtist(
    artist_id: ID!
    artist: ArtistInput!
  ): Artist

  followArtist(
    id: String!
    user_id: String!
  ): Artist

  unfollowArtist(
    id: String!
    user_id: String!
  ): Artist

  populateArtstsUsername: [Artist]
`;
