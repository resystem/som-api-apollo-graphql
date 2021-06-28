export default `
  oneSong( 
    _id: ID
    url: String
  ): Song

  allSongs( 
    song: SongInput
    paginator: PaginatorInput
  ): [Song]
`;
