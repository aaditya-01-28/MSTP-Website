const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
  jobTitle: String,
  jobId: String,
  firstName: String,
  lastName: String,
  email: String,
  countryCode: String,
  phone: String,
  country: String,
  city: String,
  resumeName: String,
  coverLetter: String,
  githubUrl: String,
  linkedinUrl: String,
  appliedAt: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('Application', applicationSchema);
