const mongoose = require('mongoose');

const ticketReplySchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    ticket: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'tickets',
    },
    reply: {
        type: String,
        require:true
    },
    attachement: {
        type: Object,
        default:{}
    }
}, { timestamps: true });

const TicketReply = mongoose.model('ticket-reply', ticketReplySchema);
module.exports = TicketReply