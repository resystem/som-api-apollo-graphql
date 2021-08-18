export default `
  oneArtist( 
    id: ID
    username: String
  ): Artist

  allArtists( 
    artist: ArtistInput
    paginator: PaginatorInput
  ): [Artist]
  
  searchArtists( 
    artist: JSON
    paginator: PaginatorInput
  ): [Artist]

  newSearchArtists(
    text: String!
  ): [Artist]
`;
