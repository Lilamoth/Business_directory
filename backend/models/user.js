const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
  },

  role: {
    type: String,
    enum: ['user', 'business'],
    default: 'user',
  },

  // Business-specific fields (only filled if role === 'business')
  businessType: String,
  contact: String,
  description: String,
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
