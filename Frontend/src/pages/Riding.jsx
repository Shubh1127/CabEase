import {Link} from "react-router-dom"
const Riding = () => {
  return (
    <div className="h-screen"> 
    <Link to={'/dashboard'} className="fixed w-10 h-10 bg-white flex items-center justify-center rounded-full top-5 right-5 z-10">
    <i className="ri-home-4-line text-lg font-medium"></i>
    </Link>
      <div className="h-1/2 ">
      <img
            className="h-full w-full object-cover"
            src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
            alt=""
          />
      </div>
      <div className="h-1/2 p-4">
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
      <button className="w-full mt-5 bg-green-600 text-white font-semibold p-2 rounded-lg ">Make a Payment</button>
      </div>
    </div>
  );
};

export default Riding;
