export default `
  type Event {
    id: ID
    productor: Productor 
    approved_artists: [Artist]
    reproved_artists: [Artist]
    subscribers: [Artist]
    
    approved_productors: [Productor]
    reproved_productors: [Productor]
    subscribed_productors: [Productor]

    location: Location
    about: String
    
    name: String
    cover: Image
    photo: Image
    site: String
    oportunities: Int
    event_date: String
    end_event_date: String
    subscribe_closing_date: String
    
    stream_url: String
    is_online: Boolean
    is_physical: Boolean
    is_on_som: Boolean

    is_to_artist: Boolean
    is_to_productor: Boolean
    
    has_accommodation: Boolean
    has_food: Boolean
    has_local_transportation: Boolean
    has_city_transportation: Boolean
    has_money_paid: Boolean
    has_interstate_transportation: Boolean
    has_international_transportation: Boolean
  }
  
  input EventInput {
    productor: String
    personas: [String]

    approved_artists: [String]
    reproved_artists: [String]
    subscribers: [String]

    approved_productors: [String]
    reproved_productors: [String]
    subscribed_productors: [String]
    
    location: String
    
    name: String
    about: String
    site: String
    photo: ImageInput
    cover: ImageInput
    oportunities: Int
    event_date: String
    end_event_date: String
    subscribe_closing_date: String

    stream_url: String
    is_online: Boolean
    is_physical: Boolean
    is_on_som: Boolean

    is_to_artist: Boolean
    is_to_productor: Boolean
    
    has_accommodation: Boolean
    has_food: Boolean
    has_local_transportation: Boolean
    has_city_transportation: Boolean
    has_money_paid: Boolean
    has_interstate_transportation: Boolean
    has_international_transportation: Boolean
  }
`;
