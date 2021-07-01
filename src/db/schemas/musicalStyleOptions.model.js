
import { Schema } from 'mongoose';

const musicalStyleOptionsModel = new Schema({
  name: { type: String, required: true, unique: true },
}, { timestamps: { updatedAt: 'updated_at', createdAt: 'created_at' } });

export default musicalStyleOptionsModel;
