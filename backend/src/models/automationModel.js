const mongoose = require('mongoose');

const automationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  script: {
    type: String,
    required: true
  },
  triggers: [{
    type: String,
    required: true
  }],
  lastExecuted: {
    type: Date,
    default: null
  },
  executionCount: {
    type: Number,
    default: 0
  },
  active: {
    type: Boolean,
    default: true
  }
}, { timestamps: true });

const Automation = mongoose.model('Automation', automationSchema);

module.exports = Automation;