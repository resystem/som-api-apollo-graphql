export default `
  type Productor {
    id: ID
    user: User
    photo: String
    name: String
    cpf: String
    cnpj: String
    description: String
    location: Location
    username: String
    followers: [User]
    follows: [User]
    following: [Artist]
    musical_styles: [MusicalStyleOption]
    occupations: [ProductorOccupation]
    events: [Event]
    subscribed_oportunities: [Event]
    status: String
    main_phone: String
    secondary_phone: String
    whatsapp: String
    telegram: String
    contact_email: String
    facebook: String
    twitter: String
    instagram: String
    youtube: String
    subscribed_opportunities: [Event]
    refused_opportunities: [Event]
    approved_opportunities: [Event]
  }

  input ProductorInput {
    description: String
    events: [ID]
    cpf: String
    cnpj: String
    followers: [ID]
    follows: [ID]
    following: [ID]
    username: String
    id: ID
    location: ID
    musical_styles: [String]
    name: String
    photo: String
    user: ID
    status: String
    main_phone: String
    secondary_phone: String
    whatsapp: String
    telegram: String
    contact_email: String
    facebook: String
    twitter: String
    instagram: String
    occupations: [ID]
    youtube: String
  }
`;
