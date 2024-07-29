const mongoose = require('mongoose')

 const UserSchema = new mongoose.Schema({
    name:String,
    lname:String,
    email:{ type: String, required: true, unique: true },
    password:{ type: String, required: true },
 })
//token:{type:String, default:null}

 const UserModel = mongoose.model("users", UserSchema)
 
 module.exports = UserModel