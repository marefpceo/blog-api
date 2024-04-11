const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AdminUserSchema = new Schema({
  first_name: { type: String, required: true, minLength: 3, maxLength: 120 },
  last_name: { type: String, required: true, minLength: 3, maxLength: 120 },
  email: { type: String, required: true, minLength: 3, maxLength: 120 },
  username: { type: String, required: true, minLength: 3, maxLength: 120 },
  password: { type: String, required: true, minLength: 3, maxLength: 120 },
  role: { type: String, required: true, minLength: 3, maxLength: 120, default: 'user' },
  isAdmin: { type: Boolean, required: true, default: false },
  status: { type: String, required: true, default: 'ok' },
  created: { type: Date, required: true },
});


// Virtual adminUser URL
AdminUserSchema.virtual('url').get(() => {
  return `admin/${this._id}`;
});

module.exports = mongoose.model('User', AdminUserSchema);