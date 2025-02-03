import { useCaptainAuth } from "../../context/CaptainContext";
import { Link } from "react-router-dom";
const CaptainHome = () => {
  const { captain, handleCaptainLogout } = useCaptainAuth();
  return (
    <div className="h-screen">
      <div>
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
          <i className="ri-logout-box-r-line font-medium text-lg"></i>
        </Link>
      </div>
      <div className="h-1/2 ">
        <img
          className="h-full w-full object-cover"
          src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
          alt=""
        />
      </div>
      <div className="h-1/2 p-5">
        <div className="">
          <div>
            <img src="" />
            <h4>Harsh Patel</h4>
          </div>
          <div>
            <h4>294.20</h4>
            <p>Earned</p>
          </div>
        </div>
        <div>
          <div className="text-center">
            <i className="ri-timer-2-line text-2xl font-thin"></i>
          <h5 className="text-lg font-medium">10.2</h5>
          <p className="text-sm text-gray-600">Hours Online</p>
          </div>
          <div className="text-center" ><i className="ri-speed-up-fill text-2xl font-thin"></i>
          <h5 className="text-lg font-medium">10.2</h5>
          <p className="text-sm text-gray-600">Hours Online</p>
          </div>
          <div className="text-center" ><i className="ri-booklet-line text-2xl font-thin"></i>
          <h5 className="text-lg font-medium">10.2</h5>
          <p className="text-sm text-gray-600">Hours Online</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CaptainHome;
