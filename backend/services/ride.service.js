const rideModel=require('../models/ride.model');
const mapsService=require('./maps.service')



async function getFare(pickup,destination){
    if(!pickup || !destination){
        throw new Error('pickup and destination are required')
    }
    const distanceTime=await mapsService.getDistanceTime(pickup,destination);
    console.log(distanceTime);
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

module.exports.createRide=async ({userId,pickup,destination,vehicleType})=>{
    if(!userId || !pickup || !destination || !vehicleType){
        throw new Error('All fields are required')
    }
    const fare=await getFare(pickup,destination);
    console.log(fare);
    const ride= rideModel.create({
        user:userId,
        pickup,
        destination,
        fare:fare[vehicleType]
    })
    return ride;
}
