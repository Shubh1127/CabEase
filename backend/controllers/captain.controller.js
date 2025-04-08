const CaptainModel=require("../Models/captain.model")
const captainService=require("../services/captain.services")
const {validationResult}=require('express-validator')
const blacklistTokenModel=require('../Models/blacklistToken.model')
const { generateAccessToken, generateRefreshToken } = require("../utils/auth.utils")
const jwt=require('jsonwebtoken')

module.exports.registerCaptain=async(req,res,next)=>{
    try{
        const errors=validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({erros:errors.array()})
        }
        const {fullname,email,password,phoneNumber,vehicle}=req.body;
        console.log(req.body)
        const isCaptainExist=await CaptainModel.findOne({email});
    if(isCaptainExist){
        return res.status(400).json({message:'catain already exist'})
    }
    const hashedPassword= await CaptainModel.hashPassword(password)
    const captain=await captainService.createCaptain({
        firstname:fullname.firstname,
        lastname:fullname.lastname,
        email,
        password:hashedPassword,
        phoneNumber,
        color:vehicle.color,
        plate:vehicle.plate,
        capacity:vehicle.capacity,
        vehicleType:vehicle.vehicleType,
        })
        const accessToken=generateAccessToken(captain)
        const refreshToken=generateRefreshToken(captain)
        res.cookie('refreshTokenCaptain',refreshToken,{
            httpOnly:true,
            secure:true,
            sameSite:"Strict",
            maxAge:7*24*60*60*1000
        })
    res.status(201).json({accessToken,captain});
    }catch(e){
        // console.log("captain error",e)
        return res.status(500).json({message:e})
    }
}
module.exports.loginCaptain=async (req,res,next)=>{
    try{
        const errors=validationResult(req)
        if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
    const {email,password}=req.body;
    const Captain=await CaptainModel.findOne({email}).select('+password')
    if(!Captain){   
        return res.status(400).json({message:'Captain not found'});
    }
    const isMatch=await Captain.comparePassword(password)
    if(!isMatch){
        return res.status(400).json({message:'Password incorrect'})
    }
    const accessToken=generateAccessToken(Captain)
    const refreshToken=generateRefreshToken(Captain)
    res.cookie('refreshTokenCaptain',refreshToken,{
        httpOnly:true,
        secure:false,
        sameSite:"Lax",
        maxAge:7*24*60*60*1000
    })
     res.status(200).json({accessToken,Captain})
}catch(err){
    console.log(err)
    return res.status(500).json({message:'Internal server error'})
}
}
// module.exports.forgotPassword=async(req,res,next)=>{
//     const {email,privateKey,newpassword,confirmpassword}=req.body;
//     const captain=await CaptainModel.findOne({email});
//     if(!captain){
//         return res.status(404).json({message:'email does not match'})
//     }
//     const isMatch=await captain.comparePrivateKey(privateKey)
//     if(!isMatch){
//         return res.status(401).json({message:'Private key incorrect'})
//     }
//     if(newpassword!==confirmpassword){
//         return res.status(400).json({message:'Password does not match'})
//     }
//     const hashedPassword= await CaptainModel.hashPassword(newpassword)
//     await CaptainModel.findByIdAndUpdate(captain._id,{password:hashedPassword})
//     res.status(200).json({message:'Password updated'})
// }
module.exports.getCaptainProfile=async(req,res,next)=>{
    return res.status(200).json(req.captain)

}
module.exports.logoutCaptain=async (req,res,next)=>{
    
    const token=req.cookies.token || req.headers.authorization.split(' ')[ 1 ];
    await blacklistTokenModel.create({token})
    res.clearCookie('refreshTokenCaptain');

    res.status(200).json({message:'Logged out'})
}

// module.exports.ForgotPassword=async(req,res,next)=>{
//     const {email,newPassword,confirmPassword}=req.body;
//     const captain=await CaptainModel
// }

module.exports.refreshToken=async(req,res)=>{
    try{
        const refreshToken=req.cookies.refreshTokenCaptain;
        if(!refreshToken){
            return res.status(403).json({message:'refresh token not found'})
        }
        jwt.verify(
            refreshToken,
            process.env.REFRESH_TOKEN_SECRET,
            async(err,decoded)=>{
                if(err){
                    return res.status(403).json({message:'Invalid refresh token'})
                }
                const captain=await CaptainModel.findById(decoded.id);
                if(!captain){
                    return res.status(403).json({message:'Captain not found'})  
                }
                const newAccessToken=generateAccessToken(captain)
                res.status(200).json({accessToken:newAccessToken})
            }
        )
    }catch(err){
        console.log(err)
        return res.status(500).json({message:'Internal server error'})
    }
}