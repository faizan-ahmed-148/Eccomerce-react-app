const jwt = require('jsonwebtoken');
const dotenv = require("dotenv")
dotenv.config({ path: './config.env'})
const User = require("../models/userSchema")

const Authentication=async (req,res,next)=>{
    
    try{
        
        const token=req.cookies.jwtoken;
        console.log(token)
        const verifyToken= jwt.verify(token, process.env.JWT_SECRET);
        console.log(verifyToken);
        const rootUser=await User.findOne({_id:verifyToken._id,"tokens.token":token})
        console.log(rootUser);
        if(!rootUser){throw new Error("user not found")}
        req.token=token;
        req.rootUser=rootUser;
        req.userID=rootUser._id;
        next();
    }catch(err){
        res.status(400).send("token not found");
        console.log(err);
    }
}
module.exports = Authentication;


