const mongoose = require('mongoose');

const consultationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  company: { type: String, default: '' },
  service: { type: String, default: 'General Consultation' },
  date: { type: String, default: '' },
  requirements: { type: String, default: '' },
  status: { 
    type: String, 
    enum: ['Pending', 'Contacted', 'Scheduled', 'Completed', 'Cancelled'], 
    default: 'Pending' 
  },
  submittedAt: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('Consultation', consultationSchema);
