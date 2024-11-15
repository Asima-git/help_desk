const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
  user:{
        type: mongoose.Schema.Types.ObjectId,
         ref: 'users'
   },
  subject:{
    type: String,
    required: true
  },
  description:{
    type: String,
    required: true
  },
  status:{
    type: String,
    default:"Open"
  },
  attachement:{
    type: String,
    default: ""
  }
},{timestamps:true});

const Ticket = mongoose.model('tickets',ticketSchema);
module.exports = Ticket