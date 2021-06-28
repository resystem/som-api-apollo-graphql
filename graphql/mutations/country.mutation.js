export default `
    createCountry(
        country: CountryInput!
    ): Country
  
    updateCountry(
        id: ID
        country: CountryInput!
    ): Country
`;
