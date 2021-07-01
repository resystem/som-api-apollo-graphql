import { Schema } from 'mongoose';

const locationModel = new Schema({
  address: { type: String },
  complement: { type: String },
  district: { type: String },
  city: { type: String },
  number: { type: String },
  zipcode: { type: String },
  state: { type: String },
  country: { type: String },
  geometry: { type: Object },
  place_id: { type: String },
}, {
  usePushEach: true,
  timestamps: { updatedAt: 'updated_at', createdAt: 'created_at' },
});

export default locationModel;
