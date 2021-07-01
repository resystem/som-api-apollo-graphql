import { Schema } from 'mongoose';

const { ObjectId } = Schema.Types;

const songsModel = new Schema({
  artist: { type: ObjectId, ref: 'artists', required: true },
  url: { type: String, required: true },
  title: { type: String, default: '' },
  deleted: { type: Boolean, default: false },
  image: {
    mimified: { type: String, default: '' },
    original: { type: String, default: '' },
    thumbnail: { type: String, default: '' },
  },
}, {
  usePushEach: true,
  timestamps: { updatedAt: 'updated_at', createdAt: 'created_at' },
});

export default songsModel;
