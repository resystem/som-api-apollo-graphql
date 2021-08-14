import { Schema } from 'mongoose';

const { ObjectId } = Schema.Types;

// change model name to producer
const productModel = Schema({
  user: { type: ObjectId, ref: 'users' },
  photo: { type: String, default: '' },
  name: { type: String, required: true },
  cpf: { type: String, defualt: '' },
  cnpj: { type: String, defualt: '' },
  description: { type: String, required: true },
  status: { type: String, default: 'INCOMPLETE' },
  location: { type: ObjectId, ref: 'locations' },
  followers: [{ type: ObjectId, ref: 'users' }],
  following: [{ type: ObjectId, ref: 'artists' }],
  musical_styles: [{ type: ObjectId, ref: 'musicalStyleOptions' }],
  occupations: [{ type: ObjectId, ref: 'productorOccupations' }],
  main_phone: { type: String, defualt: '' },
  secondary_phone: { type: String, defualt: '' },
  whatsapp: { type: String, defualt: '' },
  telegram: { type: String, defualt: '' },
  contact_email: { type: String, required: true },
  facebook: { type: String, defualt: '' },
  twitter: { type: String, defualt: '' },
  instagram: { type: String, defualt: '' },
  youtube: { type: String, defualt: '' },
  events: [{ type: ObjectId, ref: 'events' }],
  subscribed_oportunities: [{ type: ObjectId, ref: 'events' }],
}, {
  usePushEach: true,
  timestamps: { updatedAt: 'updated_at', createdAt: 'created_at' },
});

export default productModel;
