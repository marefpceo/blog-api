const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ArticleSchema = new Schema(
  {
    article_title: {
      type: String,
      required: true,
      minLength: 3,
    },
    author: { type: String, required: true, minLength: 3 },
    article_summary: {
      type: String,
      required: true,
      minLength: 3,
    },
    article_text: {
      type: String,
      required: true,
      minLength: 3,
    },
    edited_by: {
      type: String,
    },
    main_image: { type: String },
    edit_required: { type: Boolean, default: true, required: true },
    isPublished: { type: Boolean, default: false, required: true },
    date_published: { type: Date },
    date_updated: { type: Date },
    likes: { type: Number, default: 0 },
  },
  { timestamps: true },
);

module.exports = mongoose.model('Article', ArticleSchema);
