
import { Schema } from 'mongoose';

const productorOccupations = new Schema({
  label: { type: String, required: true },
  order: { type: Number, default: 0 },
}, { timestamps: { updatedAt: 'updated_at', createdAt: 'created_at' } });

export default productorOccupations;
