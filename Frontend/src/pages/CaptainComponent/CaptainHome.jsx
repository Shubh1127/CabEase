import CaptainDetails from "../../components/CaptainDetails";
import RidePopup from "../../components/RidePopup";
import { useCaptainAuth } from "../../context/CaptainContext";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { useRef,useContext,useEffect } from "react";
import { SocketContext } from "../../context/SocketContext";
import ConfirmRidePopup from "../../components/ConfirmRidePopup";
const CaptainHome = () => {
  const {socket}=useContext(SocketContext);
  const [ridePopupPanel,setRidePopupPanel]=useState(false);
  const [ConfirmRidePopupPanel,setConfirmRidePopupPanel]=useState(false);
  const { handleCaptainLogout } = useCaptainAuth();
  const ridePopupPanelRef=useRef(null);
  const ConfirmRidePopupPanelRef=useRef(null);
  const captain=JSON.parse(localStorage.getItem('captain'));
  const [ride,setRide]=useState(null)
useEffect(()=>{
  if(captain){
    socket.emit('join',{
      userId:captain?._id,
      userType:'captain'
    })
    }
  
  const updateLocation=()=>{
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition(position=>{
        
        socket.emit('update-location-captain',{
          userId:captain?._id,
          location:{
            ltd:position.coords.latitude,
            lng:position.coords.longitude
          }
        })
      })
    }
  }
  const locationInterval=setInterval(updateLocation,15000);
  updateLocation();
  
  // return()=>clearInterval(locationInterval);
})
socket.on("new-ride", (data) => {
  console.log("📦 New ride received:", data);
  setRide(data)
  setRidePopupPanel(true)
});

  useGSAP(function(){
    gsap.to(ridePopupPanelRef.current,{
       transform:ridePopupPanel?'translateY(0)':'translateY(100%)',
    })
  },[ridePopupPanel])
  useGSAP(function(){
    gsap.to(ConfirmRidePopupPanelRef.current,{
       transform:ConfirmRidePopupPanel?'translateY(0)':'translateY(100%)',
    })
  },[ConfirmRidePopupPanel])
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
          className="fixed w-11 h-127 bg-white flex items-center justify-center rounded-full top-5 right-5 z-10"
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
        <RidePopup 
        ride={ride}
        setRidePopupPanel={setRidePopupPanel} setConfirmRidePopupPanel={setConfirmRidePopupPanel} />
        </div>
      <div ref={ConfirmRidePopupPanelRef} className="fixed z-10 bottom-0 h-screen translate-y-full w-full bg-white  px-3 py-10  pt-14 ">
        <ConfirmRidePopup setConfirmRidePopupPanel={setConfirmRidePopupPanel} setRidePopupPanel={setRidePopupPanel}/>
        </div>
      </div>
    </div>
  );
};

export default CaptainHome;
