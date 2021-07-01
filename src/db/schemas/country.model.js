
import { Schema } from 'mongoose';

const countryModel = new Schema({
  name: { type: String },
  id: { type: String, required: true, unique: true },
  short_name: { type: String },
  shortName: { type: String },
  pattern: { type: String },
  pattern_name: { type: String },
}, { timestamps: { updatedAt: 'updated_at', createdAt: 'created_at' } });

export default countryModel;
