const { DateTime } = require('luxon');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  comment_text: { type: String, required: true, minLength: 3, maxLength: 120 },
  comment_article: { type: Schema.Types.ObjectId, ref: 'Article', required: true },
  comment_user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  },
  {timestamps: true}
);

module.exports = mongoose.model('Comment', CommentSchema);
