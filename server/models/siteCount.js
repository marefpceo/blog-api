const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SiteCountSchema = new Schema({
  count_total: { type: Number, required: true },
  weekly_count: { type: Number, required: true },
  weekly_user_count: { type: Number, required: true },
  weekly_comment_count: { type: Number, required: true },
  weekly_likes_count: { type: Number, required: true },
  previous_weekly_count: { type: Number, required: true },
});

module.exports = mongoose.model('SiteCount', SiteCountSchema);
