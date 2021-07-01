import { Schema } from 'mongoose';

const { ObjectId } = Schema.Types;

ObjectId.prototype.valueOf = () => this.toString();

const artistModel = new Schema({
  user: { type: ObjectId, ref: 'users' },
  name: { type: String, required: true },
  members_number: { type: Number, default: 1 },
  avatar_image: {
    mimified: { type: String, default: '' },
    original: { type: String, default: '' },
    thumbnail: { type: String, default: '' },
  },
  about: { type: String, default: '' },
  country: { type: String, default: '' },
  state: { type: String, default: '' },
  phone: { type: String, default: '' },
  email: { type: String, default: '' },
  city: { type: String, default: '' },
  musical_styles: [{ type: ObjectId, ref: 'musicalStyleOptions' }],

  facebook: { type: String, default: '' },
  location: { type: ObjectId, ref: 'locations' },
  instagram: { type: String, default: '' },
  twitter: { type: String, default: '' },
  youtube: { type: String, default: '' },
  whatsapp: { type: String, default: '' },
  telegram: { type: String, default: '' },
  integrants: [{ type: String, default: '' }],

  stage_map: { type: String, default: '' },
  tec_rider: { type: String, default: '' },
  tec_release: { type: String, default: '' },

  follows: [{
    user: { type: ObjectId, ref: 'users' },
    created_at: { type: Date, default: Date.now() },
  }],
  hometown: { type: String, default: '' },
  google_id: { type: String, default: '' },
  twitter_id: { type: String, default: '' },
  instagram_id: { type: String, default: '' },
  spotify_id: { type: String, default: '' },
  spotify_artist_link: { type: String, default: '' },
  facebook_id: { type: String, default: '' },
  approved_events: [{ type: ObjectId, ref: 'events' }],
  songs: [{ type: ObjectId, ref: 'songs' }],
  subscribed_events: [{ type: ObjectId, ref: 'events' }],
  recused_events: [{ type: ObjectId, ref: 'events' }],
  category: { type: ObjectId, ref: 'categoryOptions' },
}, {
  timestamps: { updatedAt: 'updated_at', createdAt: 'created_at' },
});

export default artistModel;
