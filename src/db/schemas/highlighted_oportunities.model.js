
import { Schema } from 'mongoose';

const { ObjectId } = Schema.Types;

const highlightedOportunityModel = new Schema({
  oportunity: { type: ObjectId, ref: 'events', required: true },
  image: { type: String, required: true },
}, { timestamps: { updatedAt: 'updated_at', createdAt: 'created_at' } });

export default highlightedOportunityModel;
