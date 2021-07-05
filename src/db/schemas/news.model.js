
import { Schema } from 'mongoose';

const newModel = new Schema({
  uri: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  image_uri: { type: String, required: true },
  tags: [{ type: String }],
}, { timestamps: { updatedAt: 'updated_at', createdAt: 'created_at' } });

export default newModel;
