const userModel=require("../Models/user.Model")
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken');
const CaptainModel = require("../Models/captain.model");
const blacklistTokenModel = require("../Models/blacklistToken.model");



module.exports.authUser = async (req, res, next) => {
    // console.log("Received Headers:", req.headers);
    let token = req.headers?.authorization?.split(" ")[1]; // Get accessToken from header
    

    if (!token) {
        console.log(here)
        return res.status(401).json({ message: "Unauthorized: No Token Provided" });
    }

    try {
        // Verify the accessToken or refreshToken
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET );
        const user = await userModel.findById(decoded._id).select("-password");

        if (!user) {
            return res.status(401).json({ message: "User not found" });
        }

        req.user = user;
        next();
    } catch (err) {
        console.error("Token verification error:", err);
        return res.status(401).json({ message: "Unauthorized: Invalid Token" });
    }
};


module.exports.authCaptain=async(req,res,next)=>{
    const token=req.cookies.token || req.headers?.authorization?.split(' ')[ 1 ];

    if(!token){
        return res.status(401).json({message:'Unauthorized'})
    }
    const isBlacklisted=await blacklistTokenModel.findOne({token:token})

    if(isBlacklisted){
        return res.status(401).json({message:'Unauthorized'})
    }
    try{
        const decoded =jwt.verify(token,process.env.JWT_SECRET)
        const captain= await CaptainModel.findById(decoded._id)

        req.captain=captain;

        return next();
    }catch(err){
        return res.status(401).json({message:'Unauthorized'})
    }
}