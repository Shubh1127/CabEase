const CaptainModel=require("../Models/captain.model")
const captainService=require("../services/captain.services")
const {validationResult}=require('express-validator')
const blacklistTokenModel=require('../Models/blacklistToken.model')

module.exports.registerCaptain=async(req,res,next)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({erros:errors.array()})
    }

    const {fullname,email,password,phoneNumber,vehicle}=req.body;

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
        
        const token=captain.generateAuthToken();
    
    res.status(201).json({token,captain});
}
module.exports.loginCaptain=async (req,res,next)=>{
    const errors=validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
    const {email,password}=req.body;

    const Captain=await CaptainModel.findOne({email}).select('+password');

    if(!Captain){
        return res.status(401).json({message:'Captain not found'});
    }
    const isMatch=await Captain.comparePassword(password)

    if(!isMatch){
        return res.status(401).json({message:'Password incorrect'})
    }
    const token=Captain.generateAuthToken();

    res.cookie('token',token)

    res.status(200).json({token,Captain})
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
    return res.status(200).json({captain:req.captain})

}



module.exports.logoutCaptain=async (req,res,next)=>{
    
    const token=req.cookies.token || req.headers.authorization.split(' ')[ 1 ];
    await blacklistTokenModel.create({token})
    res.clearCookie('token');
    res.status(200).json({message:'Logged out'})
}