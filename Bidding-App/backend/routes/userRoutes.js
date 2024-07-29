const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
require('dotenv').config();

router.post('/signup', userController.signup);
router.post('/login', userController.login);

module.exports = router;