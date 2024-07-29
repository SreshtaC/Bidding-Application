const Bid = require('../model/bid');
const AuctionItem = require('../model/auctionItem');
const User = require("../model/User");

exports.placeBid = async (req, res) => {
  try {
    const { itemId } = req.params;
    const { bidAmount , userEmail} = req.body;
    const user = await User.findOne({ email: userEmail });
    const bidderId = user._id;

    const auctionItem = await AuctionItem.findById(itemId);
    if (!auctionItem) return res.status(404).json({ error: 'Auction item not found' });
    if (auctionItem.status !== 'active') return res.status(400).json({ error: 'Auction is not active' });
    if (bidAmount <= auctionItem.currentBid) return res.status(400).json({ error: 'Bid amount must be higher than current bid' });

    const bid = new Bid({
      auctionItemId: itemId,
      bidderId,
      bidAmount
    });
    await bid.save();

    auctionItem.currentBid = bidAmount;
    await auctionItem.save();

    res.status(201).json({ message: 'Bid placed successfully', bid });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getBidHistory = async (req, res) => {
  try {
    const { itemId } = req.params;
    console.log('Item ID:', itemId); 
    const bids = await Bid.find({ auctionItemId: itemId }).sort({ bidTime: -1 }).populate('bidderId', 'name');
    res.status(200).json(bids);
  } catch (error) {
    console.error('Error fetching bid history:', error.message); // Debugging line
    res.status(500).json({ error: error.message });
  }
};

exports.getMyBids = async (req, res) => {
  try {
    const {userEmail} = req.params;
    console.log('User Email:', userEmail);

    // Find the user by email
    const user = await User.findOne({ email: userEmail });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const bidderId = user._id;

    // Find all bids made by the user
    const bids = await Bid.find({ bidderId: bidderId })
     .then(async (bids) => {
        return await Promise.all(bids.map(async (bid) => {
          const auctionItem = await AuctionItem.findById(bid.auctionItemId);
          if (!auctionItem) {
            console.log(`Auction item not found for bid ${bid._id}`);
            return null;
          }
          return {
            _id: bid._id,
            bidAmount: bid.bidAmount,
            createdAt: bid.bidTime,
            auction: {
              _id: auctionItem._id,
              title: auctionItem.title,
            },
          };
        }));
      });

    // Filter out any null values
    const filteredBids = bids.filter(bid => bid !== null);

    res.status(200).json(filteredBids);
  } catch (error) {
    console.error('Error fetching auction items with user bids:', error.message);
    res.status(500).json({ error: error.message });
  }
};