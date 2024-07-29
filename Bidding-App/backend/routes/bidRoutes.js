const express = require('express');
const router = express.Router();
const bidController = require('../controllers/bidController');
// const auth = require('../middleware/auth');

router.post('/placeBid/:itemId', bidController.placeBid);
router.get('/myBids/:userEmail', bidController.getMyBids);
router.get('/history/:itemId', bidController.getBidHistory);

module.exports = router;
