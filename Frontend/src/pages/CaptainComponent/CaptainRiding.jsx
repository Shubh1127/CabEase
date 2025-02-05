import { Link } from "react-router-dom";
const CaptainRiding = () => {
  return (
    <div className="h-screen relative">
      
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
        <i className="ri-logout-box-r-line font-medium text-lg" ></i>
      </Link>
    </div>
    <div className="h-4/5  ">
      <img
        className="h-full w-full object-cover"
        src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
        alt=""
      />
    </div>
    <div className="h-1/5 p-6 flex items-center justify-between relative bg-yellow-400">
    <h5
        className="p-1 w-[85%] text-center  absolute top-0 "
              
      >
        <i className="ri-arrow-up-wide-fill cursor-pointer text-3xl "></i>
      </h5>
      <h4 className="text-xl font-semibold">4 KM away</h4>
      <button className="  bg-green-600 text-white font-semibold p-3 px-8 rounded-lg ">Complete Ride</button>
      </div> 
      
  </div>
  )
}

export default CaptainRiding