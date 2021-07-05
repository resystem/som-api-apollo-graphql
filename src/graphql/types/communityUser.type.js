export default `
  type CommunityUser {
    id: ID
    user: User
  }
  
  input CommunityUserInput {
    id: ID
    user: ID
  }
`;
