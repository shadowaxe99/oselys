const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  genre: {
    type: String,
    required: true
  },
  developer: {
    type: String,
    required: true
  },
  publisher: {
    type: String,
    required: true
  },
  releaseDate: {
    type: Date,
    required: true
  },
  gameState: {
    type: String,
    required: true,
    enum: ['active', 'inactive', 'maintenance', 'upcoming'],
    default: 'upcoming'
  },
  multiplayerSupport: {
    type: Boolean,
    required: true,
    default: false
  },
  platform: {
    type: [String],
    required: true
  },
  systemRequirements: {
    type: Map,
    of: String
  },
  ratings: {
    type: [Number],
    default: []
  },
  price: {
    type: Number,
    required: true
  },
  inGameItems: {
    type: [{
      itemName: String,
      itemDescription: String,
      itemRarity: String,
      itemPrice: Number
    }],
    default: []
  },
  nftIntegration: {
    type: Boolean,
    default: false
  },
  nftAssets: {
    type: [{
      assetId: mongoose.Schema.Types.ObjectId,
      assetName: String,
      assetDescription: String,
      assetOwner: mongoose.Schema.Types.ObjectId
    }],
    default: []
  }
}, { timestamps: true });

const Game = mongoose.model('Game', gameSchema);

module.exports = Game;