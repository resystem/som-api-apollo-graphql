export default `
  oneUser( 
    id: ID
    ida: String
  ): User

  allUsers( 
    user: UserInput
    paginator: PaginatorInput
  ): [User]
`;
