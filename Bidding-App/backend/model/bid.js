const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('../model/User');
const AuctionItem = require('../model/auctionItem');

const bidSchema = new Schema({
  auctionItemId: { type: Schema.Types.ObjectId, ref: 'auctions', required: true },
  bidderId: { type: Schema.Types.ObjectId, ref: 'users', required: true },
  bidAmount: { type: Number, required: true },
  bidTime: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Bid', bidSchema);