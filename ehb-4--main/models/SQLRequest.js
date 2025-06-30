const mongoose = require('mongoose');

const SQLRequestSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  currentLevel: {
    type: String,
    enum: ['Free', 'Basic', 'Normal', 'High', 'VIP'],
    required: true,
  },
  requestedLevel: {
    type: String,
    enum: ['Basic', 'Normal', 'High', 'VIP'],
    required: true,
  },
  reason: {
    type: String,
  },
  documents: [{
    type: String, // file URLs
  }],
  status: {
    type: String,
    enum: ['Pending', 'Approved', 'Rejected', 'Hold'],
    default: 'Pending',
  },
  verifiedBy: [{
    type: String,
    enum: ['PSS', 'EMO', 'EDR'],
  }],
  note: {
    type: String,
  },
  approvedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  history: [{
    level: String,
    date: Date,
    verifiedBy: String,
    by: String, // admin/franchise
    status: String,
  }],
}, {
  timestamps: true, // createdAt, updatedAt
});

module.exports = mongoose.model('SQLRequest', SQLRequestSchema); 