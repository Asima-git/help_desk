const { Router } = require('express');
const router = Router();
const {generateTicket,getAllTickets,getSingleTickets,ticketReply,allTickets,
    getTicketReply,listUsers,createUser,updateTicketReply,deleteTicketReply} = require('../controllers/ticketController');
const getUser = require('../middleware/getUser');
const {upload} = require('../utils/fileUpload');

router.post('/generate-ticket',generateTicket);
router.get('/all-ticket',getAllTickets);
router.get('/view/:id',getSingleTickets);
router.post('/reply',upload.single('attachement'), ticketReply);
router.get('/list-ticket',allTickets);
router.get('/get-reply/:id',getTicketReply);
router.get('/users',listUsers);
router.post('/create-user',createUser);
router.put('/update-reply/:id',updateTicketReply);
router.delete('/delete-reply/:id',deleteTicketReply);

module.exports = router

