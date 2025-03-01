import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import axios from "axios";
import 'remixicon/fonts/remixicon.css';
import LocationSearchPanel from "../../components/LocationSearchPanel";
import VehiclePanel from "../../components/VehiclePanel";
import ConfirmRide from "../../components/ConfirmRide";
import LookingForDriver from "../../components/LookingForDriver";
import WaitingForDriver from "../../components/WaitingForDriver";

const Dashboard = () => {
  const [info, setInfo] = useState({
    pickup: "",
    destination: "",
  });
  const [panelOpen, setPanelOpen] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const panelRef = useRef(null);
  const [currentField, setCurrentField] = useState("");
  const panelCloseRef = useRef(null);
  const VehiclePanelRef = useRef(null);
  const vehicleFoundRef = useRef(null);
  const waitingForDriverRef = useRef(null);
  const ConfirmRideRef = useRef(null);
  const [vehiclePanel, setVehiclePanel] = useState(false);
  const [confirmRidePanel, setConfirmRidePanel] = useState(false);
  const [vehicleFound, setVehicleFound] = useState(false);
  const [waitingForDriver, setWaitingForDriver] = useState(false);

  const handleChange = async (e) => {
    const { name, value } = e.target;
    setInfo({
      ...info,
      [name]: value,
    });

    if (value.length > 2) {
      try {
        const response = await axios.get("http://localhost:3000/maps/get-suggestions", {
          params: {input:value},
          headers:{
            Authorization: `Bearer ${localStorage.getItem("idToken")}`,
          }
        });
        setSuggestions(response.data.suggestions);
        setCurrentField(name);
        setPanelOpen(true);
      } catch (error) {
        console.error("Error fetching suggestions:", error);
      }
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setInfo({
      ...info,
      [currentField]: suggestion.description,
    });
    // setVehiclePanel(true);
    // setPanelOpen(false);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    console.log("Form Submitted");
  };

  useGSAP(function () {
    gsap.to(panelRef.current, {
      height: panelOpen ? '70%' : '0%',
      padding: panelOpen ? 24 : 0,
    });
    gsap.to(panelCloseRef.current, {
      opacity: panelOpen ? 1 : 0,
    });
  }, [panelOpen]);

  useGSAP(function () {
    gsap.to(VehiclePanelRef.current, {
      transform: vehiclePanel ? 'translateY(0)' : 'translateY(100%)',
    });
  }, [vehiclePanel]);

  useGSAP(function () {
    gsap.to(ConfirmRideRef.current, {
      transform: confirmRidePanel ? 'translateY(0)' : 'translateY(100%)',
    });
  }, [confirmRidePanel]);

  useGSAP(function () {
    gsap.to(vehicleFoundRef.current, {
      transform: vehicleFound ? 'translateY(0)' : 'translateY(100%)',
    });
  }, [vehicleFound]);

  useGSAP(function () {
    gsap.to(waitingForDriverRef.current, {
      transform: waitingForDriver ? 'translateY(0)' : 'translateY(100%)',
    });
  }, [waitingForDriver]);

  return (
    <>
      <div className="h-screen relative overflow-hidden ">
        <img
          className="w-16 absolute left-5 top-5"
          src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
          alt=""
        />
        <div className="h-screen w-screen">
          <img
            className="h-full w-full object-cover"
            src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
            alt=""
          />
        </div>
        <div className="h-screen flex flex-col justify-end absolute top-0 w-full ">
          <div className="h-[30%] bg-white p-5 relative">
            <h5 ref={panelCloseRef} className="text-right text-xl cursor-pointer">
              <i className="ri-arrow-down-wide-line" onClick={() => setPanelOpen(false)}></i>
            </h5>
            <h4 className="text-2xl font-semibold">Find a Trip</h4>
            <form
              onSubmit={(e) => {
                submitHandler(e);
              }}
              className="flex flex-col"
            >
              <div className="line absolute h-15 w-1 top-[47%] left-10 bg-gray-900 rounded-full"></div>
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
                placeholder="Enter your destination"
              />
            </form>
            { panelOpen && info.pickup && info.destination.length>6 &&(
              <button
              onClick={() => {
                setVehiclePanel(true);
                setPanelOpen(false);
                
              }}
              className="bg-black text-white text-lg font-semibold rounded-lg mt-5 p-3" >Find Trip</button>
             )}
          </div>
          <div ref={panelRef} className="bg-white h-[0]">
            <LocationSearchPanel
              suggestions={suggestions}
              setPanelOpen={setPanelOpen}
              setVehiclePanel={setVehiclePanel}
              handleSuggestionClick={handleSuggestionClick}
            />
          </div>
        </div>
        <div ref={VehiclePanelRef} className="fixed z-10 bottom-0 w-full bg-white translate-y-full px-3 py-10 pt-14">
          <VehiclePanel setConfirmRidePanel={setConfirmRidePanel} setVehiclePanel={setVehiclePanel} />
        </div>
        <div ref={ConfirmRideRef} className="fixed z-10 bottom-0 w-full bg-white translate-y-full px-3 py-6 pt-12">
          <ConfirmRide setConfirmRidePanel={setConfirmRidePanel} setVehicleFound={setVehicleFound} />
        </div>
        <div ref={vehicleFoundRef} className="fixed z-10 bottom-0 w-full bg-white translate-y-full px-3 py-6 pt-12">
          <LookingForDriver setVehicleFound={setVehicleFound} />
        </div>
        <div ref={waitingForDriverRef} className="fixed z-10 bottom-0 w-full bg-white translate-y-full px-3 py-6 pt-12">
          <WaitingForDriver waitingForDriver={waitingForDriver} />
        </div>
      </div>
    </>
  );
};

export default Dashboard;