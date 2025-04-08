const axios = require("axios");
const CaptainModel = require("../Models/captain.model");
module.exports.getAddressCoordinates = async (address) => {
  try{
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${process.env.API_KEY}`
    );
    if (response.data.status === "OK") {
      const location = response.data.results[0].geometry.location;
      return {
        ltd: location.lat,
        lng: location.lng,
      };
    } else {
      console.log(response.data);
    }
  }
  catch(err){
    console.error(err);
    throw err;
  }
};
module.exports.getDistanceTime=async(origin,destination)=>{
  if(!origin || !destination){
    throw new Error("origin and destination are required");
  }
  const apiKey=process.env.API_KEY;
  const url=`https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(origin)}&destinations=${encodeURIComponent(destination)}&key=${apiKey}`;
  try{
    const response=await axios.get(url);
    if(response.data.status==='OK'){
      if(response.data.rows[0].elements[0].status==='ZERO_RESULTS'){
        throw new Error('No results found');
      }
      return response.data.rows[0].elements[0];
    }else{
      console.log(response.data);
      // throw new Error('Unable to fetch distance and time');
    }

  }catch(err){
    console.error(err);
    throw err;
  }
}
module.exports.getSuggestions=async(input)=>{
  if(!input){
    throw new Error("query is required");
  }
  const apiKey=process.env.API_KEY;
  const url=`https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(input)}&key=${apiKey}`;
  try{
   const response=await axios.get(url);
    if(response.data.status==='OK'){
      return response.data.predictions;
    }else{
      console.log(response.data);
    }
  }
  catch(err){
    console.error(err);
    throw err;
  }
}

module.exports.getCaptainsInRadius=async(lng,ltd,radius)=>{
      const captains=await CaptainModel.find({
        location: {
          $nearSphere: {
            $geometry: {
              type: "Point",
              coordinates: [lng, ltd]
            },
            $maxDistance: radius * 1000 // meters
          }
        }
      })

  return captains;
}