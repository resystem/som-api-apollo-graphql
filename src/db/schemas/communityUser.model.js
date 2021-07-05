
import { Schema } from 'mongoose';

const { ObjectId } = Schema.Types;

const communityUserModel = new Schema({
  user: { type: ObjectId, ref: 'users' },
}, { timestamps: { updatedAt: 'updated_at', createdAt: 'created_at' } });

export default communityUserModel;
