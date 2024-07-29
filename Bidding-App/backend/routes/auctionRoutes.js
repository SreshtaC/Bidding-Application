const express = require('express');
const router = express.Router();
const auctionController = require('../controllers/auctionController');

router.post('/createAuc', auctionController.createAuctionItem);
router.get('/getAuc', auctionController.getAllAuctionItems);
router.get('/:itemId', auctionController.getAuctionItem);
router.get('/myAucs/:userEmail', auctionController.getAllMyAuctionItems);
router.put('/:itemId', auctionController.updateAuctionItem);
router.delete('/:itemId', auctionController.deleteAuctionItem);


module.exports = router;