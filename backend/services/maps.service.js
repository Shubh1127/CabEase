const axios=require('axios');
module.exports.getAddressCoordinates = async (address) => {
  const response = await axios.get(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${process.env.API_KEY}`
  );
  return response.data;
}