export default `
  oneMusicalStyleOption( 
    _id: ID!
  ): MusicalStyleOption

  allMusicalStyleOptions( 
    musical_style_option: MusicalStyleOptionInput
    paginator: PaginatorInput
  ): [MusicalStyleOption]
`;
