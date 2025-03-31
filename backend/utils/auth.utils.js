const jwt=require('jsonwebtoken');
require('dotenv').config();
const ACCESS_SECRET=process.env.ACCESS_SECRET;
const REFRESH_SECRET=process.env.REFRESH_TOKEN_SECRET;

const generateAccessToken=(user)=>{
    return jwt.sign({
        id:user._id,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {expiresIn:'15m'});
}
const generateRefreshToken=(user)=>{
    return jwt.sign({id:user._id},process.env.REFRESH_TOKEN_SECRET,{expiresIn:'7d'});
    
}

module.exports={generateAccessToken,generateRefreshToken}