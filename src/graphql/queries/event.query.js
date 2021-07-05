export default `
  oneEvent( 
    id: ID
  ): Event

  allEvents( 
    event: EventInput
    paginator: PaginatorInput
  ): [Event]
  
  searchEvents(
    musical_styles: [ID]
    years: [Int]
    months: [Int]
    event: EventInput
    paginator: PaginatorInput
  ): [Event]

  allEventToArtist: [Event]
  allEventToProductor: [Event]
`;
