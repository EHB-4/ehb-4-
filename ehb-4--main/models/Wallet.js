const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['fine', 'reward', 'deposit', 'purchase'],
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  referenceId: String, // complaintId, orderId, etc.
  note: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const WalletSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true,
  },
  balance: {
    type: Number,
    default: 0,
  },
  lockedBalance: {
    type: Number,
    default: 0,
  },
  walletType: {
    type: String,
    enum: ['User', 'Franchise', 'Admin'],
    required: true,
  },
  transactions: [TransactionSchema],
}, {
  timestamps: true,
});

module.exports = mongoose.model('Wallet', WalletSchema); 