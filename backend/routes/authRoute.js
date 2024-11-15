const { Router } = require('express');
const {registerUser,loginUser,logout,deleteUser,editUser,getSingleUser} = require('../controllers/authController');
const router = Router();
const getUser = require('../middleware/getUser');

router.post('/register',registerUser);
router.post('/login',loginUser);
router.get('/logout',logout);
router.delete('/delete-user/:id',deleteUser);
router.put('/edit-user/:id',editUser);
router.get('/get-user/:id',getSingleUser);

router.get('/check-auth',getUser,(req,res)=>{
    const user = req.user;
    return res.status(200).json({
       success:true,
       message:"User is authenticated",
       user,
    })
})
module.exports = router