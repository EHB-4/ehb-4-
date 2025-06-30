const mongoose = require('mongoose');

const LawyerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  specialization: [{
    type: String,
    enum: ['Criminal', 'Civil', 'Family', 'Business', 'Other'],
    required: true,
  }],
  experienceYears: {
    type: Number,
    default: 0,
  },
  sqlLevel: {
    type: String,
    enum: ['Free', 'Basic', 'Normal', 'High', 'VIP'],
    default: 'Free',
  },
  sqlVerifiedBy: [{
    type: String,
    enum: ['PSS', 'EMO', 'EDR'],
  }],
  sqlExpiresAt: {
    type: Date,
  },
  reviews: {
    type: Number,
    default: 0,
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
    default: 0,
  },
  status: {
    type: String,
    enum: ['Active', 'Suspended', 'Pending'],
    default: 'Pending',
  },
  online: {
    type: Boolean,
    default: false,
  },
  profilePicUrl: {
    type: String,
  },
  // AI-based auto fields
  aiScore: {
    type: Number,
    min: 0,
    max: 100,
    default: 0,
  },
  sqlEligibleForUpgrade: {
    type: Boolean,
    default: false,
  },
  autoRecommendedLevel: {
    type: String,
    enum: ['Free', 'Basic', 'Normal', 'High', 'VIP'],
  },
}, {
  timestamps: true, // createdAt, updatedAt
});

module.exports = mongoose.model('Lawyer', LawyerSchema); 