const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SiteCountSchema = new Schema({
  count_total: { type: Number, required: true },
});

module.exports = mongoose.model('SiteCount', SiteCountSchema);
