import CaptainDetails from "../../components/CaptainDetails";
import RidePopup from "../../components/RidePopup";
import { useCaptainAuth } from "../../context/CaptainContext";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { useRef } from "react";
const CaptainHome = () => {
  const [ridePopupPanel,setRidePopupPanel]=useState(true);
  const { captain, handleCaptainLogout } = useCaptainAuth();
  const ridePopupPanelRef=useRef(null);
  useGSAP(function(){
    gsap.to(ridePopupPanelRef.current,{
       transform:ridePopupPanel?'translateY(0)':'translateY(100%)',
    })
  },[ridePopupPanel])
  return (
    <div className="h-screen">
      <div className="fixed p-6  top-0 flex items-center justify-between w-screen">
        <img
          className="w-16 absolute left-5 top-5"
          src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
          alt=""
        />
        {/* {captain ?<button onClick={handleCaptainLogout}>Logout</button>:<Link to={'/captain-login'}>Login</Link>} */}
        <Link
          to={"/dashboard"}
          className="fixed w-10 h-10 bg-white flex items-center justify-center rounded-full top-5 right-5 z-10"
        >
          <i className="ri-logout-box-r-line font-medium text-lg" onClick={handleCaptainLogout}></i>
        </Link>
      </div>
      <div className="h-3/5  ">
        <img
          className="h-full w-full object-cover"
          src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
          alt=""
        />
      </div>
      <div className="h-2/5 p-6">
        <CaptainDetails/>
      </div>
      <div>
      <div ref={ridePopupPanelRef} className="fixed z-10 bottom-0 translate-y-full w-full bg-white  px-3 py-10  pt-14 ">
        <RidePopup setRidePopupPanel={setRidePopupPanel}/>
        </div>
      </div>
    </div>
  );
};

export default CaptainHome;
