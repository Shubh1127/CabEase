const rideService=require('../services/ride.service')
const {validationResult}=require('express-validator')
const mapsService=require('../services/maps.service')
const {sendMessageToSocketId}=require('../socket')
const rideModel=require('../Models/ride.model')
module.exports.createRide=async(req,res)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
    const {pickup,destination,vehicleType}=req.body;
    try{
        const ride=await rideService.createRide({userId:req.user._id,pickup,destination,vehicleType});
             res.status(201).json({ride})
            const pickupCorrdinates=await mapsService.getAddressCoordinates(pickup);
            // console.log(pickupCorrdinates)
            const captainsInRadius=await mapsService.getCaptainsInRadius(pickupCorrdinates.lng, pickupCorrdinates.ltd, 2);
            ride.otp=''

            const rideWithUser=await rideModel.findOne({_id:ride._id}).populate('user')
           captainsInRadius.map(captain=>{
                sendMessageToSocketId(captain.socketId,{
                    event:'new-ride',
                    data:rideWithUser
                })
           })

    }catch(err){
        console.error(err);
        return res.status(500).json({message:err.message})
    }
}

module.exports.getFare=async(req,res)=>{

    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
    const {pickup,destination}=req.query;
    try{
        const fare=await rideService.getFare(pickup,destination);
        return res.status(200).json({fare})

    }catch(err){
        console.error(err);
        return res.status(500).json({message:err.message})
    }
}

module.exports.confirmRide=async(req,res)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
    const {rideId}=req.body;
    try{
        console.log(rideId)
        const ride = await rideService.confirmRide({ rideId, captainId: req.captain._id });
        console.log(ride)
        sendMessageToSocketId(ride.user.socketId,{
            event:'ride-confirmed',
            data:ride
        })
        return res.status(200).json({ride})

    }catch(err){
        console.error(err);
        return res.status(500).json({message:err.message})
    }
}

module.exports.startRide=async(req,res)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
    const {rideId,otp}=req.query;
    try{
        const ride=await rideService.startRide({rideId,captainId:req.captain._id,otp});
        sendMessageToSocketId(ride.user.socketId,{
            event:'ride-started',
            data:ride
        })
        return res.status(200).json({ride})

    }catch(err){
        console.error(err);
        return res.status(500).json({message:err.message})
    }
}

module.exports.endRide=async(req,res)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
    const {rideId}=req.body;
    try{
        const ride=await rideService.endRide({rideId,captainId:req.captain._id});
        sendMessageToSocketId(ride.user.socketId,{
            event:'ride-ended',
            data:ride
        })
        return res.status(200).json({ride})

    }catch(err){
        console.error(err);
        return res.status(500).json({message:err.message})
    }
}