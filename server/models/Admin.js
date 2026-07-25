const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  resetCode: String,
  resetCodeExpires: Date
}, { timestamps: true });

module.exports = mongoose.model('Admin', adminSchema);
