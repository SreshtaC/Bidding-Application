const cron = require('node-cron');
const AuctionItem = require('./model/auctionItem'); // Adjust the path as needed

// Scheduled task to update auction status
cron.schedule('* * * * *', async () => {
  try {
    const now = new Date();
    const result = await AuctionItem.updateMany(
      { endDate: { $lte: now }, status: 'active' },
      { status: 'completed', updatedAt: now }
    );
    console.log('Checked and updated auction statuses:', result);
  } catch (error) {
    console.error('Error updating auction statuses:', error);
  }
});
