const AuctionItem = require('../model/auctionItem');
const User = require("../model/User")
const jwt = require('jsonwebtoken');

exports.createAuctionItem = async (req, res) => {
  try {
    const { title, description, image, minBid, endDate, userEmail } = req.body;
    const user = await User.findOne({ email: userEmail });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    const sellerId = user._id;
    const auctionItem = new AuctionItem({
      title,
      description,
      image,
      minBid,
      currentBid: minBid,
      endDate,
      sellerId
    });
    await auctionItem.save();
    res.status(201).json({ message: 'Auction item created successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllAuctionItems = async (req, res) => {
  try {
    console.log("Fetching auctions");
    const auctionItems = await AuctionItem.find({ status: 'active' });
    res.status(200).json(auctionItems);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAuctionItem = async(req, res) => {
  const {itemId} = req.params;
  try {
    const auctionItem = await AuctionItem.findById(itemId);
    res.json(auctionItem);
  } catch (error) {
    res.status(404).json({ message: 'Auction item not found' });
  }
}

exports.getAllMyAuctionItems = async (req, res) => {
    const { userEmail } = req.params;
    const user = await User.findOne({ email: userEmail });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
  try {
    const myAuctionItems = await AuctionItem.find({ sellerId: user._id });
    res.status(200).json(myAuctionItems);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateAuctionItem = async (req, res) => {
  try {
    const { itemId } = req.params;
    const { title, description, image, minBid, endDate, userEmail } = req.body;
    console.log(`Received data: ${JSON.stringify(req.body)}`);
    const user = await User.findOne({ email: userEmail });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    const sellerId = user._id;
    const auctionItem = await AuctionItem.findOneAndUpdate(
      { _id: itemId, sellerId },
      { title, description, image, minBid, endDate, updatedAt: new Date() },
      { new: true }
    );
    if (!auctionItem) return res.status(404).json({ error: 'Auction item not found' });
    res.status(200).json({ message: 'Auction item updated successfully', auctionItem });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteAuctionItem = async (req, res) => {
  try {
    const { itemId } = req.params;
    const auctionItem = await AuctionItem.findOneAndDelete({ _id: itemId });
    if (!auctionItem) return res.status(404).json({ error: 'Auction item not found' });
    res.status(200).json({ message: 'Auction item deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// exports.getCompletedAuctionItems = async (req, res) => {
//   try {
//     console.log("Fetching completed auctions");
//     const completedAuctions = await AuctionItem.find({ status: 'completed' });
//     console.log(completedAuctions)
//     res.status(200).json(completedAuctions);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };