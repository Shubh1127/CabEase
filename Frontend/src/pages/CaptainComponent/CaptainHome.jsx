import { useCaptainAuth } from "../../context/CaptainContext";
import { Link } from "react-router-dom";
const CaptainHome = () => {
    const {captain,handleCaptainLogout}=useCaptainAuth();
    return (
      <>
      <div className="flex justify-between mx-5 p-2">
      <div>Dashboard</div>
      {captain ?<button onClick={handleCaptainLogout}>Logout</button>:<Link to={'/captain-login'}>Login</Link>}
      </div>
      </>
    )
}

export default CaptainHome