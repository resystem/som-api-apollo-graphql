export default `
  createArtist(
    artist: ArtistInput!
  ): Artist
  updateArtist(
    artist_id: ID!
    artist: ArtistInput!
  ): Artist
  followArtist(
    artist: ID!,
    user: ID!
  ) : Artist
  unfollowArtist(
    artist: ID!,
    user: ID!
  ) : Artist
`;
