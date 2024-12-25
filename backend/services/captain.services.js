const CaptainModel=require("../Models/captain.model")


module.exports.createCaptain=async ({
    firstname,lastname,email,password,privateKey,color,plate,capacity,vehicleType
})=>{
    if(! firstname || !email ||  !password || !color || !plate ||  !capacity || !privateKey){
        throw new Error('All fields are required');
    }
    const captain=CaptainModel.create({
        fullname:{
            firstname,
            lastname
        },
        email,
        password,
        privateKey,
        vehicle:{
            color,
            plate,
            capacity,
            vehicleType
        }
    })

    return captain;
}