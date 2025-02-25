const rideModel=require('../models/ride.model');
module.exports.createRide=async (userId,pickup,destination)=>{
    const ride=new rideModel({
        user:userId,
        pickup,
        destination
    })
    await ride.save();
    return ride;
}