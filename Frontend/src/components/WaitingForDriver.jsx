
const WaitingForDriver = (props) => {
  return (
    <div>
    <h5 className="p-1 w-[93%] text-center absolute top-0" onClick={()=>{props.waitingForDriver(false)} }><i className="ri-arrow-down-wide-fill text-3xl text-gray-200"></i></h5>
    <div className="flex items-center justify-between">
    <img className="h-12" src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1714471451/assets/27/362eaf-3e88-4568-a460-29b0da41c285/original/UberX-%281%29.png"/>
    <div className="text-right" >
      <h2 className="text-lg font-medium">Sarthak</h2>
      <h4 className="font-semibold text-xl -mt-1 -mb-1 ">MP04 AB 1234</h4>
      <p className="text-sm text-gray-600">Maruti Suzukui Alto</p>
    </div>
    </div>
    <div className="flex  gap-2 flex-col justify-between items-center ">
    <div className="w-full mt-5">
      <div className="flex items-center gap-2 p-3 border-b-2">
        <i className="ri-map-pin-range-fill text-xl"></i>
        <div>
          <h3 className="text-lg font-medium">562/11-A</h3>
          <p className="text-gray-600 text-sm -mt-1">Kankariya Talab, Ahemdabad</p>
        </div>
      </div>
      <div className="flex items-center gap-2 p-3 border-b-2"> <i className="ri-map-pin-2-fill"></i>
        <div>
          <h3 className="text-lg font-medium">562/11-A</h3>
          <p className="text-gray-600 text-sm -mt-1">Kankariya Talab, Ahemdabad</p>
        </div></div>
      <div className="flex items-center gap-2 p-3 "> <i className="ri-currency-line"></i>
        <div>
          <h3 className="text-lg font-medium">₹193</h3>
          <p className="text-gray-600 text-sm -mt-1">Cash Cash</p>
        </div></div>
    </div>
    </div>
  </div>
  )
}

export default WaitingForDriver