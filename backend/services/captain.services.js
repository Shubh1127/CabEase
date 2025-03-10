const CaptainModel=require("../Models/captain.model")


module.exports.createCaptain=async ({
    firstname,lastname,email,password,phoneNumber,color,plate,capacity,vehicleType
})=>{
    if(! firstname || !email ||  !password || !color || !plate ||  !capacity || !phoneNumber){
        throw new Error('All fields are required');
    }
    const captain=await CaptainModel.create({
        fullname:{
            firstname,
            lastname
        },
        email,
        password,
        phoneNumber,
        vehicle:{
            color,
            plate,
            capacity,
            vehicleType
        }
    })

    return captain;
}