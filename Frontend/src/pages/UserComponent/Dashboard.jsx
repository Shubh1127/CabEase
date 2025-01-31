// import { Link } from "react-router-dom"
// import { useUser } from "../../context/UserContext";
import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import 'remixicon/fonts/remixicon.css'
import LocationSearchPanel from "../../components/LocationSearchPanel";
const Dashboard = () => {
  // const {user,handleLogout}=useUser();
  const [info, setInfo] = useState({
    pickup: "",
    destination: "",
  });
  const [panelOpen, setPanelOpen] = useState(false);
  const panelRef=useRef(null);
  const panelCloseRef=useRef(null);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInfo({
      ...info,
      [name]: value,
    });
  };
  const submitHandler = (e) => {
    e.preventDefault();
    console.log("Form Submitted");
  };

  useGSAP(function(){
    gsap.to(panelRef.current,{ 
      height:panelOpen?'70%':'0%',
      padding:panelOpen?24:0,
    })
    gsap.to(panelCloseRef.current,{
      opacity:panelOpen?1:0,
    })
  },[panelOpen])
  return (
    <>
      <div className="h-screen relative overflow-hidden ">
        {/* <div className="flex justify-between mx-5 p-2">Dashboard
    {user ?<button onClick={handleLogout}>Logout</button>:<Link to={'/login'}>Login</Link>}
    </div> */}
        <img
          className="w-16 absolute left-5 top-5"
          src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
          alt=""
        />
        <div className="h-screen w-screen">
          {/* image for temporary use */}
          <img
            className="h-full w-full object-cover"
            src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
            alt=""
          />
        </div>
        <div className=" h-screen flex flex-col justify-end absolute top-0 w-full ">
          <div className="h-[30%] bg-white p-5 relative">
            <h5 ref={panelCloseRef} className="text-right text-xl cursor-pointer">
            <i className="ri-arrow-down-wide-line" onClick={()=>setPanelOpen(false)}></i>
            </h5>
            <h4 className="text-2xl font-semibold">Find a Trip</h4>
            <form
              onSubmit={(e) => {
                submitHandler(e);
              }}
              className="flex flex-col"
            >
              <div className="line absolute h-16 w-1 top-[34%] left-10 bg-gray-900 rounded-full"></div>
              <input
                className="bg-[#eee] px-12 py-2 text-lg rounded-lg w-full mt-5"
                type="text"
                onClick={() => {
                  setPanelOpen(true);
                }}
                name="pickup"
                value={info.pickup}
                onChange={handleChange}
                placeholder="Add a Pickup Location"
              />
              <input
                className="bg-[#eee] px-12 py-2 text-lg rounded-lg w-full mt-3"
                type="text"
                onClick={() => {
                  setPanelOpen(true);
                }}
                name="destination"
                value={info.destination}
                onChange={handleChange}
                placeholder="Enter your  destination "
              />
            </form>
          </div>
          <div ref={panelRef} className=" bg-white h-[0] ">
            <LocationSearchPanel/>
          </div>
        </div>
        <div className="fixed z-10 bottom-0 w-full bg-white px-3 py-6 ">
          <h3 className="text-2xl font-semibold mb-5">Choose a Vehicle</h3>
          <div className="flex items-center border-2  mb-2 rounded-xl border-black w-full justify-between p-3">
            <img  className="h-12" src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1682350114/assets/c2/296eac-574a-4a81-a787-8a0387970755/original/UberBlackXL.png " alt="" />
                <div className="w-1/2">
                  <h4 className="font-medium text-base">UberGo <span><i className="ri-user-3-fill"></i>4 </span></h4>
                  <h5 className=" font-medium text-sm">2 mins away</h5>
                  <p className=" font-normal  text-xs text-gray-600">Affordable, compact rides</p>
                </div>
                <h2 className="text-2xl font-semibold">₹193.20</h2>
          </div>
          <div className="flex items-center border-2  mb-2 rounded-xl border-black w-full justify-between p-3">
            <img  className="h-12" src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1682350114/assets/c2/296eac-574a-4a81-a787-8a0387970755/original/UberBlackXL.png " alt="" />
                <div className="w-1/2">
                  <h4 className="font-medium text-base">UberGo <span><i className="ri-user-3-fill"></i>4 </span></h4>
                  <h5 className=" font-medium text-sm">2 mins away</h5>
                  <p className=" font-normal  text-xs text-gray-600">Affordable, compact rides</p>
                </div>
                <h2 className="text-2xl font-semibold">₹193.20</h2>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
