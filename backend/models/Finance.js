const mongoose = require('mongoose');

const financeSchema = new mongoose.Schema({
  business: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  revenueHistory: [
    {
      year: Number,
      revenue: Number
    }
  ],
  CAGR: Number,
  profitMargin: Number,
  ROI: Number,
  customerRetentionRate: Number
});

module.exports = mongoose.model('Finance', financeSchema);
