const axios = require("axios");
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
