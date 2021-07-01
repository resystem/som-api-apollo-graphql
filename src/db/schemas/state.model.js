
import { Schema } from 'mongoose';

const statesModel = new Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String },
  short_name: { type: String },
  shortName: { type: String },
  old_country_id: { type: String },
  country: { type: Schema.ObjectId, ref: 'countries' },

}, { timestamps: { updatedAt: 'updated_at', createdAt: 'created_at' } });

export default statesModel;
