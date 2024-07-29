const express = require("express")
const mongoose = require("mongoose")
const cors = require('cors');
const userRoutes = require("./routes/userRoutes")
const auctionRoutes = require("./routes/auctionRoutes")
const bidRoutes = require("./routes/bidRoutes")
// const auth = require('./middleware/auth')
require('dotenv').config()

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URL);

app.use('/api/users', userRoutes);
app.use('/api/auctions', auctionRoutes);
app.use('/api/bids', bidRoutes);

// app.use(auth.authenticate);

app.get('/ping',(req,res)=>res.send('pong'))

app.listen(4000, () => {
    console.log("server is running")
})

// const crypto = require('crypto');
// const secret = crypto.randomBytes(64).toString('hex');
// console.log(secret); 
