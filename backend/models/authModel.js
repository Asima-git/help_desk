const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    role:{
       type: String,
       default:'Customer'
    },
    date:{
        type: Date,
        default: Date.now
    },
},{timestamps:true})

const User = mongoose.model('users',UserSchema);
module.exports = User