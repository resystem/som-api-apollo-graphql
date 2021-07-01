
import { Schema } from 'mongoose';

const cityModel = new Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String },
  old_state_id: { type: String },
  state: { type: Schema.ObjectId, ref: 'states' },
}, { timestamps: { updatedAt: 'updated_at', createdAt: 'created_at' } });

export default cityModel;
