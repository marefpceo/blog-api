const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ArticleSchema = new Schema({
  article_title: { type: String, required: true, minLength: 3, maxLength: 120 },
  author: { type: String, required: true, minLength: 3, maxLength: 120 },
  article_text: { type: String, required: true, minLength: 3, maxLength: 120 },
  isPublished: { type: Boolean, default: false, required: true},
  date_published: { type: Date },
  date_updated: { type: Date },
  }, 
  {timestamps: true}
);

// Virtual article URL
ArticleSchema.virtual('url').get(() => {
  return `/articles/${this._id}`;
});

module.exports = mongoose.model('Article', ArticleSchema);
