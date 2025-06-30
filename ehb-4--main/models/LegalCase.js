const mongoose = require('mongoose');

const LegalCaseSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  lawyerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Lawyer',
    default: null, // Assigned later
  },
  title: {
    type: String,
    required: true,
  },
  caseType: {
    type: String,
    enum: ['Civil', 'Criminal', 'Family', 'Business', 'Other'],
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  documents: [{
    fileUrl: String,
    uploadedAt: Date,
    verified: { type: Boolean, default: false }
  }],
  status: {
    type: String,
    enum: ['Pending', 'In Review', 'In Progress', 'Resolved', 'Rejected'],
    default: 'Pending',
  },
  timeline: [{
    note: String,
    status: String,
    updatedBy: String, // admin/lawyer/user
    date: { type: Date, default: Date.now }
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('LegalCase', LegalCaseSchema); 