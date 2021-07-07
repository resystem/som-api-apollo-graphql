
import { Schema } from 'mongoose';

const { ObjectId } = Schema.Types;

const highlightedOportunityModel = new Schema({
  oportunity: { type: ObjectId, ref: 'events', required: true },
  image: { type: String, required: true },
  mobile_image: { type: String },
  link: { type: String },
}, { timestamps: { updatedAt: 'updated_at', createdAt: 'created_at' } });

export default highlightedOportunityModel;
