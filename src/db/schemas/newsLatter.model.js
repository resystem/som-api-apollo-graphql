
import { Schema } from 'mongoose';

const newsLatterModel = new Schema({
  email: { type: String, required: true },
}, { timestamps: { updatedAt: 'updated_at', createdAt: 'created_at' } });

export default newsLatterModel;
