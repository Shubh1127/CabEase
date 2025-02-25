const mapsService=require('../services/maps.service');
const {validationResult}=require('express-validator');
module.exports.getCoordinates=async (req,res)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
    const {address}=req.query;
try{
    const coordinates=await mapsService.getAddressCoordinates(address);
    res.status(200).json({coordinates})
}catch(error){
    res.status(404).json({message:`coordinates not found ${error}`})
}
}

module.exports.getDistanceTime=async(req,res)=>{
    try{
        const erros=validationResult(req);
        if (!erros.isEmpty()){
            return res.status(400).json({errors:erros.array()})
        }
        const {origin,destination}=req.query;
        const distanceTime=await mapsService.getDistanceTime(origin,destination);
        res.status(200).json({distanceTime})

    }catch(err){
        console.error(err);
        res.status(404).json({message:`distance and time not found ${err}`})
    }
}
module.exports.getSuggestions=async(req,res)=>{
    try{
        const errors=validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors:errors.array()})
        }
        const {input}=req.query;
        const suggestions=await mapsService.getSuggestions(input);
        res.status(200).json({suggestions})
    }catch(err){
        console.error(err);
        res.status(404).json({message:`suggestions not found ${err}`})
    }
}