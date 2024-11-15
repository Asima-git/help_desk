const Ticket = require('../models/ticketModel');
const TicketReply = require('../models/ticketReplyModel');
const User = require('../models/authModel');
const bcrypt = require('bcryptjs');

//EndPoint for Generate Ticket
const generateTicket = async(req,res)=>{
  const {subject,description,status,attachement} = req.body
  try {
    if (!subject || !description) {
      return res.status(400).json({ success: false, message: "Please fill the required fields" });
  }
    const data = await Ticket.create({
        subject,description,status,attachement,
        user: req.user.id,
      });
      if (data) return res.status(200).json({ success: true, message: "Ticket Created Successfully" });
  } catch (error) {
    return res.status(500).json({
        success:false,
        message:"Some error occured"
    })
  }
}

// Get Ticketies by users
const getAllTickets = async(req,res)=>{
   try {
    const allTicket = await Ticket.find({ user: req.user.id }).sort({ createdAt: -1 });
    return res.status(200).json({success:true,data:allTicket});
   } catch (error) {
    console.log(error);
    return res.status(500).json({
        success:false,
        message:"Some error occured"
    })
   }
}

// Get All Ticketies for Admin and Agent
const allTickets = async (req, res) => {
  try {
    const allTicket = await Ticket.find()
      .populate('user', 'name')  
      .sort({ createdAt: -1 }); 
    return res.status(200).json({ success: true, data: allTicket });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Some error occurred",
    });
  }
};

//Get single Ticket
const getSingleTickets = async (req, res) => {
  try {
    const singleTicket = await Ticket.findById(req.params.id)
      .populate('user', 'name'); 
    if (!singleTicket) {
      return res.status(404).json({ success: false, message: "Ticket not found" });
    }
    return res.status(200).json({ success: true, data: singleTicket });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Some error occurred"
    });
  }
};


//Ticket Reply endPoint
const ticketReply = async(req,res) =>{
  const {reply,ticketId,newStatus} = req.body;
  try {
    if (!reply) {
      return res.status(400).json({ success: false, message: "Please fill the required fields" });
  }
    const ticket = await Ticket.findById(ticketId);
    if (!ticket) {
      return res.status(404).json({ message: 'Ticket not found' });
    }
    const data = await TicketReply.create({
        reply,
        attachement: req.file ? req.file.path : '',
        user: req.user.id,
        ticket:ticketId
      });
      if (newStatus) {
        ticket.status = newStatus;
        await ticket.save();
      }
    if (data) return res.status(200).json({ success: true, message: "Replied !!!" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
        success:false,
        message:"Some error occured"
    })
  }
}

// Get Ticketies by users
const getTicketReply = async(req,res)=>{
  const ticketId = req.params.id;
  try {
   const data = await TicketReply.find({ ticket: ticketId}).populate('user', 'name role');
   return res.status(200).json({success:true,data:data});
  } catch (error) {
   console.log(error);
   return res.status(500).json({
       success:false,
       message:"Some error occured"
   })
  }
}

// Get All Users
const listUsers = async (req, res) => {
  try {
    const data = await User.find(); 
    return res.status(200).json({ success: true, data: data });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Some error occurred",
    });
  }
};

const createUser = async (req, res) => {
  const { name, email, password,role } = req.body;
  try {
      if (!name || !email || !password ) {
          return res.status(400).json({ success: false, message: "Please fill the required fields" });
      }
      const userExists = await User.findOne({ email });
      if (userExists) {
          return res.status(400).json({ success: false, message: "User already exists" });
      }
      const hashPassword = await bcrypt.hash(password, 12);
      const user = await User.create({
          name,
          email,
          password: hashPassword,
          role
      });
      if (user) {
          return res.status(200).json({ success: true, message: "User Created Successfully" });
      }

  } catch (error) {
      console.log(error);
      return res.status(500).json({
          success: false,
          message: "Some error occurred"
      });
  }
};

const updateTicketReply = async (req, res) => {
  const { reply } = req.body; 
  const { replyId } = req.params.id; 

  try {
    if (!reply) {
      return res.status(400).json({ success: false, message: "Please provide a reply" });
    }
    const ticketReply = await TicketReply.findById(replyId);
    if (!ticketReply) {
      return res.status(404).json({ success: false, message: 'Ticket reply not found' });
    }

    if (ticketReply.user.toString() !== req.user.id) {
      return res.status(403).json({ success: false, message: 'You are not authorized to edit this reply' });
    }
    ticketReply.reply = reply;
    if (req.file) {
      ticketReply.attachement = req.file.path;
    }
    await ticketReply.save();
    return res.status(200).json({ success: true, message: "Ticket reply updated successfully!" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while updating the ticket reply"
    });
  }
};

const deleteTicketReply = async (req, res) => {
  const { replyId } = req.params.id; 
  try {
    const ticketReply = await TicketReply.findById(replyId);
    if (!ticketReply) {
      return res.status(404).json({ success: false, message: 'Ticket reply not found' });
    }
    if (ticketReply.user.toString() !== req.user.id) {
      return res.status(403).json({ success: false, message: 'You are not authorized to delete this reply' });
    }
    await ticketReply.remove();

    return res.status(200).json({ success: true, message: "Ticket reply deleted successfully!" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while deleting the ticket reply"
    });
  }
};


module.exports = {generateTicket,getAllTickets,getSingleTickets,ticketReply,allTickets,
  getTicketReply,listUsers,createUser,updateTicketReply,deleteTicketReply}