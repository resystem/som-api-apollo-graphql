export default `
  createSong(
    song: SongInput!
  ): Song
  
  updateSong(
    song_id: ID!
    song: SongInput!
  ): Song
  
  deleteSong(
    song_id: ID!
  ): Song

  favoriteSong(
    song_id: ID!
    user_id: ID!
  ): Song

  unfavoriteSong(
    song_id: ID!
    user_id: ID!
  ): Song
`;
