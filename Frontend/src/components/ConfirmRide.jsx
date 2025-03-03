
const ConfirmRide = (props) => {
  return (
    <div>
      <h5 className="p-1 w-[93%] text-center absolute top-0 " onClick={()=>{props.setConfirmRidePanel(false)} }><i className="ri-arrow-down-wide-fill cursor-pointer text-3xl text-gray-200"></i></h5>
      <h3 className="text-2xl font-semibold mb-5">Confirm your Ride</h3>
      <div className="flex  gap-2 flex-col justify-between items-center ">
      <img className="h-20" src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1714471451/assets/27/362eaf-3e88-4568-a460-29b0da41c285/original/UberX-%281%29.png"/>
      <div className="w-full mt-5">
        <div className="flex items-center gap-2 p-3 border-b-2">
          <i className="ri-map-pin-range-fill text-xl"></i>
          <div>
            <h3 className="text-lg font-medium">562/11-A</h3>
            <p className="text-gray-600 text-sm -mt-1">{props.pickup}</p>
          </div>
        </div>
        <div className="flex items-center gap-2 p-3 border-b-2"> <i className="ri-map-pin-2-fill"></i>
          <div>
            <h3 className="text-lg font-medium">562/11-A</h3>
            <p className="text-gray-600 text-sm -mt-1">{props.destination}</p>
          </div></div>
        <div className="flex items-center gap-2 p-3 "> <i className="ri-currency-line"></i>
          <div>
            <h3 className="text-lg font-medium">₹{Number(props?.fare).toFixed(2)}</h3>
            <p className="text-gray-600 text-sm -mt-1">Cash Cash</p>
          </div></div>
      </div>
      <button className="w-full mt-5 bg-green-600 text-white font-semibold p-2 rounded-lg " onClick={()=>{props.setVehicleFound(true) ; props.setConfirmRidePanel(false) ; props.createRide(props.vehicleType)}}>Confirm Ride</button>
      </div>
    </div>
  )
}

export default ConfirmRide