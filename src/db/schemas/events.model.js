import { Schema } from 'mongoose';

const { ObjectId } = Schema.Types;
const defaultEventDate = +new Date() + 30 * 24 * 60 * 60 * 1000;
const defaultClosingDate = +new Date() + 29 * 24 * 60 * 60 * 1000;
const eventsModel = new Schema({
  productor: { type: ObjectId, ref: 'productors' },
  approved_artists: [{ type: ObjectId, ref: 'artists' }],
  approved_productors: [{ type: ObjectId, ref: 'productors' }],
  reproved_artists: [{ type: ObjectId, ref: 'artists' }],
  reproved_productors: [{ type: ObjectId, ref: 'productors' }],
  subscribers: [{ type: ObjectId, ref: 'artists' }],
  subscribed_productors: [{ type: ObjectId, ref: 'productors' }],
  location: { type: ObjectId, ref: 'locations' },
  name: { type: String, default: '' },
  about: { type: String, default: '' },
  photo: {
    mimified: { type: String, default: '' },
    original: { type: String, default: '' },
    thumbnail: { type: String, default: '' },
  },
  cover: {
    mimified: { type: String, default: '' },
    original: { type: String, default: '' },
    thumbnail: { type: String, default: '' },
  },
  site: { type: String, default: '' },
  oportunities: { type: String, default: '' },
  event_date: { type: Date, default: defaultEventDate },
  end_event_date: { type: Date, default: defaultEventDate },
  subscribe_closing_date: { type: Date, default: defaultClosingDate },
  has_accommodation: { type: Boolean, default: false },
  has_food: { type: Boolean, default: false },
  has_local_transportation: { type: Boolean, default: false },
  has_city_transportation: { type: Boolean, default: false },
  has_interstate_transportation: { type: Boolean, default: false },
  has_international_transportation: { type: Boolean, default: false },
  has_money_paid: { type: Boolean, default: false },
  musical_genres: [{ type: ObjectId, ref: 'musical_genres' }],
}, {
  usePushEach: true,
  timestamps: { updatedAt: 'updated_at', createdAt: 'created_at' },
});

export default eventsModel;
