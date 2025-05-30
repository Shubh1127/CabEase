
const VehiclePanel = (props) => {
  return (
    <div>
        <h5 className="p-1 w-[93%] text-center absolute top-0" onClick={()=>{props.setVehiclePanel(false)} }><i className="ri-arrow-down-wide-fill text-3xl text-gray-200"></i></h5>
          <h3 className="text-2xl font-semibold mb-5">Choose a Vehicle</h3>
          
          <div onClick={()=>{
            props.setConfirmRidePanel(true),
            props.selectVehicle('car')
          }} 
            className="flex items-center border-2  mb-2 rounded-xl active:border-black  w-full justify-between p-3">
            <img  className="h-12" src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1714471451/assets/27/362eaf-3e88-4568-a460-29b0da41c285/original/UberX-%281%29.png" alt="" />
                <div className="ml-2 w-1/2">
                  <h4 className="font-medium text-base">UberGo <span><i className="ri-user-3-fill"></i>4 </span></h4>
                  <h5 className=" font-medium text-sm">2 mins away</h5>
                  <p className=" font-normal  text-xs text-gray-600">Affordable, compact rides</p>
                </div>
                <h2 className="text-lg font-semibold">₹{Number(props.fare?.car)?.toFixed(2)}</h2>
          </div>
          <div onClick={()=>{
            props.setConfirmRidePanel(true),
            props.selectVehicle('moto')
          }} 
          className="flex items-center border-2  mb-2 rounded-xl active:border-black  w-full justify-between p-3">
            <img  className="h-10" src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1649231091/assets/2c/7fa194-c954-49b2-9c6d-a3b8601370f5/original/Uber_Moto_Orange_312x208_pixels_Mobile.png" alt="" />
                <div className="-ml-2 w-1/2">
                  <h4 className="font-medium text-base">Moto <span><i className="ri-user-3-fill"></i>1 </span></h4>
                  <h5 className=" font-medium text-sm">3 mins away</h5>
                  <p className=" font-normal  text-xs text-gray-600">Affordable, Motorcycle rides</p>
                </div>
                <h2 className="text-lg font-semibold">₹{Number(props?.fare?.moto)?.toFixed(2)}</h2>
          </div>
          <div onClick={()=>{
            props.setConfirmRidePanel(true),
            props.selectVehicle('auto')
          }}
           className="flex items-center border-2  mb-2 rounded-xl active:border-black  w-full justify-between p-3">
            <img  className="h-12" src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1648431773/assets/1d/db8c56-0204-4ce4-81ce-56a11a07fe98/original/Uber_Auto_558x372_pixels_Desktop.png" alt="" />
                <div className="ml-2 w-1/2">
                  <h4 className="font-medium text-base">UberAuto <span><i className="ri-user-3-fill"></i>3</span></h4>
                  <h5 className=" font-medium text-sm">3 mins away</h5>
                  <p className=" font-normal  text-xs text-gray-600">Affordable, Auto rides</p>
                </div>
                <h2 className="text-lg font-semibold">₹{Number(props?.fare?.auto)?.toFixed(2)}</h2>
          </div>
    </div>
  )
}

export default VehiclePanel