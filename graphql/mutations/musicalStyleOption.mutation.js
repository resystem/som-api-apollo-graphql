export default `
  createMusicalStyleOption(
    musical_style_option: MusicalStyleOptionInput!
  ): MusicalStyleOption
  
  updateMusicalStyleOption(
    musical_style_option_id: ID!
    musical_style_option: MusicalStyleOptionInput!
  ): MusicalStyleOption
`;
