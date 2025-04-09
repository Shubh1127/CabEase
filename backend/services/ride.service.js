const rideModel=require('../models/ride.model');
const mapsService=require('./maps.service')
const crypto=require('crypto');
const {sendMessageToSocketId} =require('../socket')

async function getFare(pickup,destination){
    if(!pickup || !destination){
        throw new Error('pickup and destination are required')
    }
    const distanceTime=await mapsService.getDistanceTime(pickup,destination);
    const baseFare={
        auto:30,
        car:50,
        moto:20
    };
    const perKmRate={
        auto:10,
        car:15,
        moto:8
    };
    const perMinuteRate={
        auto:2,
        car:3,
        moto:1.5
    };
    const fare={
        auto:baseFare.auto+((distanceTime.distance.value/1000)*perKmRate.auto)+((distanceTime.duration.value/60)*perMinuteRate.auto),
        car:baseFare.car+((distanceTime.distance.value/1000)*perKmRate.car)+((distanceTime.duration.value/60)*perMinuteRate.car),
        moto:baseFare.moto+((distanceTime.distance.value/1000)*perKmRate.moto)+((distanceTime.duration.value/60)*perMinuteRate.moto)
    }
    return fare;
}

module.exports.getFare=getFare;

function getOtp(num){
    function generationOtp(num){
        const otp=crypto.randomInt(Math.pow(10,num-1),Math.pow(10,num)).toString();
        return otp;
    }
    return generationOtp(num);
}
module.exports.createRide=async ({userId,pickup,destination,vehicleType})=>{
    if(!userId || !pickup || !destination || !vehicleType){
        throw new Error('All fields are required')
    }
    const fare=await getFare(pickup,destination);
    const ride= rideModel.create({
        user:userId,
        pickup,
        destination,
        otp:getOtp(6),
        fare:fare[vehicleType]
    })
    return ride;
}

module.exports.confirmRide=async({
    rideId,captainId
})=>{
    if(!rideId ){
        throw new Error('ride id is  required')
    }
    await rideModel.findOneAndUpdate({
        _id:rideId
    },{
        status:'accepted',
        captain:captainId
    })
    const ride=await rideModel.findOne({
        _id:rideId
    }).populate('user').populate('captain').select('+otp')
    if(!ride){
        throw new Error('ride not found')
    }
   return ride
}
module.exports.startRide=async({rideId,otp})=>{
    if(!rideId || !otp){
        throw new Error('ride id and otp are required')
    }
    const ride=await rideModel.findOne({
        _id:rideId
    }).populate('user').populate('captain').select('+otp')

    if(!ride){
        throw new Error('Ride not found')
    }
    if(ride.status !=='accepted'){
        throw new Error('Ride not accepeted')
    }

    if(ride.otp !==otp){
        throw new Error('Invalid otp')
    }
    await rideModel.findOneAndUpdate({
        _id:rideId
    },{
        status:'ongoing'
    })
    sendMessageToSocketId(ride.user.socketId,{
        event:'ride-started',
        data:ride
    })
    return ride;
}

module.exports.endRide=async({rideId,captainId})=>{
    if(!rideId || !captainId){
        throw new Error('ride id and captain id are required')
    }
    const ride=await rideModel.findOne({
        _id:rideId,
        captain:captainId
    }).populate('user').populate('captain')
    if(!ride){
        throw new Error('Ride not found')
    }

    if(ride.status !=='ongoing'){
        throw new Error('Ride not ongoing')
    }
    await rideModel.findOneAndUpdate({
        _id:rideId
    },{
        status:'completed'
    })
    // sendMessageToSocketId(ride.user.socketId,{
    //     event:'ride-completed',
    //     data:ride
    // })
    return ride;
}