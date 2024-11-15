const { Router } = require('express');
const router = Router();
const {generateTicket,getAllTickets,getSingleTickets,ticketReply,allTickets,
    getTicketReply,listUsers,createUser,updateTicketReply,deleteTicketReply} = require('../controllers/ticketController');
const getUser = require('../middleware/getUser');
const {upload} = require('../utils/fileUpload');

router.post('/generate-ticket',getUser,generateTicket);
router.get('/all-ticket',getUser,getAllTickets);
router.get('/view/:id',getUser,getSingleTickets);
router.post('/reply',getUser,upload.single('attachement'), ticketReply);
router.get('/list-ticket',getUser,allTickets);
router.get('/get-reply/:id',getUser,getTicketReply);
router.get('/users',getUser,listUsers);
router.post('/create-user',getUser,createUser);
router.put('/update-reply/:id',getUser,updateTicketReply);
router.delete('/delete-reply/:id',deleteTicketReply);

module.exports = router

