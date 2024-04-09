const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AdminUserSchema = new Schema({
  username: { type: String, required: true, minLength: 3, maxLength: 120 },
  password: { type: String, required: true, minLength: 3, maxLength: 120 },
  role: { type: String, required: true, minLength: 3, maxLength: 120, default: 'editor' },
  isAdmin: { type: Boolean, required: true, defafault: false }
});


// Virtual adminUser URL
AdminUserSchema.virtual('url').get(() => {
  return `admin/${this._id}`;
});

module.exports = mongoose.model('AdminUser', AdminUserSchema);