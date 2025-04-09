import { Link } from "react-router-dom";
import axios from 'axios';
import {useNavigate} from 'react-router-dom'
import { useCaptainAuth } from "../context/CaptainContext";
const FinishRide = (props) => {
  const navigate=useNavigate();
  const {getTokenWithExpiry} =useCaptainAuth();
  async function endRide(){
    const token = getTokenWithExpiry("captainToken");
    const response = await axios.post(
      "http://localhost:3000/rides/end-ride",
      {
        rideId: props?.ride?._id,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.status === 200) {
      props.setFinishRidePanel(false);
      navigate('/captain-home')
    }
  }
  return (
    <div>
      <h5
        className="p-1 w-[93%] text-center absolute top-0 "
        onClick={() => {
          props.setFinishRidePanel(false);
        }}
      >
        <i className="ri-arrow-down-wide-fill cursor-pointer text-3xl text-gray-200"></i>
      </h5>
      <h3 className="text-2xl font-semibold mb-5">Finish this ride</h3>
      <div className="flex items-center mt-4 p-4 border-2 border-yellow-400 rounded-lg  justify-between">
        <div className="flex items-center gap-3 ">
          <img
            className="h-12 rounded-full object-cover w-12"
            src="https://imgs.search.brave.com/7X6LbkIGdSn8dongwIvfqKmyE_FCAc9XrKVg487t-jE/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvNTA4/OTU2NjQ0L3Bob3Rv/L3ByZXR0eS1jb2xv/bWJpYW4td29tYW4u/anBnP3M9NjEyeDYx/MiZ3PTAmaz0yMCZj/PWpFd1RDTUtTcGpZ/c2FTZmlGSWxpZllu/ZVVwY3p1cmVRRmw4/bzU0M19aakU9"
          />

          <h2 className="text-xl font-medium">{props?.ride?.user?.fullname?.firstname}</h2>
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
                {props?.ride?.pickup}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 p-3 border-b-2">
            {" "}
            <i className="ri-map-pin-2-fill"></i>
            <div>
              <h3 className="text-lg font-medium">562/11-A</h3>
              <p className="text-gray-600 text-sm -mt-1">
                {props?.ride?.destination}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 p-3 ">
            {" "}
            <i className="ri-currency-line"></i>
            <div>
              <h3 className="text-lg font-medium">₹{props?.ride?.fare}</h3>
              <p className="text-gray-600 text-sm -mt-1">Cash Cash</p>
            </div>
          </div>
        </div>

        <div className="mt-10 w-full">
          <button
            onClick={endRide}
            className="w-full mt-5 flex justify-center  bg-green-600 text-lg text-white font-semibold p-3 rounded-lg "
          >
            Finish Ride
          </button>
          {/* <p className="text-red-500 mt-10 text-xs">Click on the button if you have completed the payment</p> */}
        </div>
      </div>
    </div>
  );
};

export default FinishRide;
