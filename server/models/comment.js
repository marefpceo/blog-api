const { DateTime } = require('luxon');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  comment_user: { type: Schema.Types.ObjectId, ref: 'PublicUser', required: true },
  comment_title: { type: String, required: true, minLength: 3, maxLength: 120 },
  comment_text: { type: String, required: true, minLength: 3, maxLength: 120 },
  timestamp: { type: Date, default: Date.now },
});

// Comment virtual url
CommentSchema.virtual('url').get(() => {
  return `/comment/${this._id}`;
})

module.exports = mongoose.model('Comment', CommentSchema);
