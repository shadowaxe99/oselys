const mongoose = require('mongoose');

const NFTSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  image: {
    type: String,
    required: true
  },
  metadata: {
    type: Object,
    required: false
  },
  blockchainId: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  isForSale: {
    type: Boolean,
    default: false
  },
  transactionHistory: [{
    transactionId: String,
    date: Date,
    from: mongoose.Schema.Types.ObjectId,
    to: mongoose.Schema.Types.ObjectId,
    price: Number
  }]
}, { timestamps: true });

module.exports = mongoose.model('NFT', NFTSchema);