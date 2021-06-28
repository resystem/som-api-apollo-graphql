export default `
  oneArtist( 
    id: ID!
  ): Artist

  allArtists( 
    artist: ArtistInput
    paginator: PaginatorInput
  ): [Artist]
  
  searchArtists( 
    artist: JSON
    paginator: PaginatorInput
  ): [Artist]
`;
