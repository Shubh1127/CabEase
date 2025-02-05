import { Link } from "react-router-dom";
import { useState } from "react";
const ConfirmRidePopup = (props) => {
  const [otp,setOtp]=useState('');
  const submitHandler = (e) => {
    e.preventDefault();
    console.log("submitted");
  };
  return (
    <div>
      <h5
        className="p-1 w-[93%] text-center absolute top-0 "
        //   onClick={() => {
        //     props.setRidePopupPanel(false);
        //   }}
      >
        <i className="ri-arrow-down-wide-fill cursor-pointer text-3xl text-gray-200"></i>
      </h5>
      <h3 className="text-2xl font-semibold mb-5">
        Confirm this ride to Start
      </h3>
      <div className="flex items-center mt-4 p-3 bg-yellow-400 rounded-lg  justify-between">
        <div className="flex items-center gap-3 ">
          <img
            className="h-12 rounded-full object-cover w-12"
            src="https://imgs.search.brave.com/7X6LbkIGdSn8dongwIvfqKmyE_FCAc9XrKVg487t-jE/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvNTA4/OTU2NjQ0L3Bob3Rv/L3ByZXR0eS1jb2xv/bWJpYW4td29tYW4u/anBnP3M9NjEyeDYx/MiZ3PTAmaz0yMCZj/PWpFd1RDTUtTcGpZ/c2FTZmlGSWxpZllu/ZVVwY3p1cmVRRmw4/bzU0M19aakU9"
          />

          <h2 className="text-xl font-medium">Harsh patel</h2>
        </div>
        <h5 className=" text-lg font-semibold">2.2 KM</h5>
      </div>
      <div className="flex  gap-2 flex-col justify-between items-center ">
        <div className="w-full mt-5">
          <div className="flex items-center gap-2 p-3 border-b-2">
            <i className="ri-map-pin-range-fill text-xl"></i>
            <div>
              <h3 className="text-lg font-medium">562/11-A</h3>
              <p className="text-gray-600 text-sm -mt-1">
                Kankariya Talab, Ahemdabad
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 p-3 border-b-2">
            {" "}
            <i className="ri-map-pin-2-fill"></i>
            <div>
              <h3 className="text-lg font-medium">562/11-A</h3>
              <p className="text-gray-600 text-sm -mt-1">
                Kankariya Talab, Ahemdabad
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 p-3 ">
            {" "}
            <i className="ri-currency-line"></i>
            <div>
              <h3 className="text-lg font-medium">₹193</h3>
              <p className="text-gray-600 text-sm -mt-1">Cash Cash</p>
            </div>
          </div>
        </div>

        <div className="mt-6" >
          <form 
            onSubmit={(e) => {
              submitHandler(e);
            }}
          >
            <input
              type="number"
              onChange={(e)=>setOtp(e.target.value)}
              value={otp} 
              placeholder="Enter OTP"
              className="bg-[#eee] px-6 py-4 text-lg font-medium  rounded-lg w-full mt-5"
            />
            <Link
              to="/captain-riding "
              className="w-full mt-5 flex justify-center text-lg  bg-green-600 text-white font-semibold p-3 rounded-lg "
            >
              Confirm
            </Link>
            <button
              className="w-full mt-1 bg-red-500 text-white font-semibold  text-lg p-2 rounded-lg "
              onClick={() => {
                props.setConfirmRidePopupPanel(false);
              }}
            >
              Cancel
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ConfirmRidePopup;
