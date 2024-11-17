const jwt = require('jsonwebtoken');
const getUser = (req, res, next) => {
   const token = req.cookies.token;
   console.log("Token:", token);
   console.log("Environment:", process.env.NODE_ENV);
    if(!token){
        return res.status(401).json({
            success:false,
            message:"Unauthorised User",
            token:"Token:"
        })
     }
     try {
        const decoded = jwt.verify(token,process.env.CLIENT_SECRETE_KEY);
        req.user = decoded 
        next()
     } catch (error) {
        res.status(401).json({
            success:false,
            message:"Unauthorised User",
            token:"Token:"
            error:error
        })
     }
}
module.exports = getUser;