const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PublicUserSchema = new Schema({
  username: { type: String, required: true, minLength: 3, maxLength: 120 },
  email: { type: String, required: true, minLength: 3, maxLength: 120 },
  user_comments: [{ type: Schema.Types.ObjectId, ref: 'Comment'}],
});

// Virtual publicUser URL
PublicUserSchema.virtual('url').get(() => {
  return `/user/${this._id}`;
});

module.exports = mongoose.model('PublicUser', PublicUserSchema);
