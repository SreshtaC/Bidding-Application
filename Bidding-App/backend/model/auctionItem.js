const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('../model/User');

const auctionItemSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  minBid: { type: Number, required: true },
  currentBid: { type: Number, required: true },
  endDate: { type: Date, required: true },
  sellerId: { type: Schema.Types.ObjectId, ref: 'users', required: true },
  status: { type: String, enum: ['active', 'completed', 'canceled'], default: 'active' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('auctions', auctionItemSchema);