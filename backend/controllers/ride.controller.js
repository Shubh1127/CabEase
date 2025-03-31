const rideService=require('../services/ride.service')
const {validationResult}=require('express-validator')
const mapsService=require('../services/maps.service')
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
            // const captainsInRadius=await mapsService.getCaptainsInRadius()

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