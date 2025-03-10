const userModel=require('../Models/user.Model')
const userService=require("../services/user.services")
const {validationResult}=require('express-validator')
const blacklistTokenModel=require('../Models/blacklistToken.model')

module.exports.registerUser=async (req,res,next)=>{
    try{

        const {firstname,lastname,email,password,phoneNumber,authProvider}=req.body;
        const isUserExist=await userModel.findOne({email});
        if(isUserExist){
            return res.status(400).json({message:'user already exist'})
        }
        hashedPassword=undefined;
        if(authProvider==='local' && password){
            hashedPassword=await userModel.hashPassword(password);
        }
        
        const user=await userService.createUser({
            firstname,
            lastname,
            email,
            password:hashedPassword,
            phoneNumber,
            authProvider
        })
        
        const token=user.generateAuthToken();
        res.cookie('token',token)
        
        res.status(200).json({token,user});
    }catch(e){
        console.error(e)
    }
    
}

module.exports.loginUser=async (req,res,next)=>{
    const {email,password}=req.body;

    const user=await userModel.findOne({email}).select('+password');

    if(!user){
        return res.status(401).json({message:'User not found'});
    }
    if(user.authProvider=='local'){
        const isMatch=await user.comparePassword(password)
        if(!isMatch){
            return res.status(401).json({message:'Password incorrect'})
        }
    }
    const token=user.generateAuthToken();

    res.cookie('token',token)

    res.status(200).json({token,user})
}
// module.exports.forgotPassword=async (req,res,next)=>{
//     const{email,privateKey,newpassword,confirmpassword}=req.body;
//     const user=await userModel.findOne({email});
//     if(!user){
//         return res.status(404).json({message:'email does not match'})
//     }
//     // console.log(user)
//     const isMatch=await user.compareKey(privateKey);
//     if(!isMatch){
//         return res.status(400).json({message:'key  does not match'})
//     }
//     if(newpassword!==confirmpassword){
//         return res.status(400).json({message:'Password do not match'})
//     }
//     const hashedPassword=await userModel.hashPassword(newpassword);
//     await userModel.findByIdAndUpdate(user._id,{password:hashedPassword});
//     return res.status(200).json({message:'Password reset successful'})
// }

module.exports.getUserProfile=async (req,res,next)=>{
    res.status(200).json(req.user)
}

module.exports.logoutUser=async (req,res,next)=>{
    const token=req.cookies.token || req.headers.authorization.split(' ')[ 1 ];
    await blacklistTokenModel.create({token})
    res.clearCookie('token');
    res.status(200).json({message:'Logged out'})
}