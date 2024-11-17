const dotenv = require("dotenv").config();
const bcrypt = require('bcryptjs');
const User = require('../models/authModel');
const jwt = require('jsonwebtoken');

//Register EndPoint
const registerUser = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        if (!name || !email || !password) {
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


//Login EndPoint
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check for empty fields
        if (!email || !password) {
            return res.status(400).json({ success: false, message: "Please fill the required fields" });
        }

        // Validate if user exists
        const checkUser = await User.findOne({ email });
        if (!checkUser) {
            return res.status(400).json({ success: false, message: "Invalid credentials, please try again" });
        }

        // Check if password is correct
        const checkPassword = await bcrypt.compare(password, checkUser.password);
        if (!checkPassword) {
            return res.status(400).json({ success: false, message: "Invalid credentials, please try again" });
        }

        // Generate JWT token
        const token = jwt.sign(
            {
                id: checkUser._id,
                role: checkUser.role,
                email: checkUser.email,
                name:checkUser.name,
            },process.env.CLIENT_SECRETE_KEY, 
            { expiresIn: "60m" }
        );
        console.log(token);
        return res.cookie('token', token, {
          path: '/',
          httpOnly: true,
          expires: new Date(Date.now() + 1000 * 84600), // 1 day
          sameSite: 'none',
          secure: true,
        }).json({
                success: true,
                message: "Logged in successfully",
                user: {
                    email: checkUser.email,
                    role: checkUser.role,
                    id: checkUser._id,
                    name: checkUser.name,
                    token:token
                },
            });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Some error occurred"
        });
    }
};

//logout 
const logout = (req,res)=>{
    res.clearCookie('token', { httpOnly: true, secure: false });
    return res.status(200).json({ success: true, message: "Logged out successfully" });
}


//delete user
const deleteUser = async (req, res) => {
    try {
      let data = await User.findById(req.params.id);
    
      if (!data) {
        return res.status(404).send("User Not Found");
      }
  
      // Delete the user
      await User.findByIdAndDelete(req.params.id);
      return res.json({ success: true, message: "User has been deleted" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        success: false,
        message: "An error occurred while deleting the user",
      });
    }
  };
  
  // Edit User
const editUser = async (req, res) => {
    try {
      let user = await User.findById(req.params.id);
  
      if (!user) {
        return res.status(404).send("User Not Found");
      }
  
      const updates = req.body;
      user = await User.findByIdAndUpdate(req.params.id, updates, { new: true });
  
      return res.json({
        success: true,
        message: "User has been updated",
        data: user, 
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        success: false,
        message: "An error occurred while updating the user",
      });
    }
  };
  
  const getSingleUser = async (req, res) => {
    try {
      // Find the user by their ID
      const singleUser = await User.findById(req.params.id);
  
      if (!singleUser) {
        return res.status(404).json({ success: false, message: "User not found" });
      }
      return res.status(200).json({ success: true, data: singleUser });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        success: false,
        message: "Some error occurred"
      });
    }
  };
  

module.exports = { registerUser,loginUser,logout,deleteUser,editUser,getSingleUser}