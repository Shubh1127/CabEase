import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
const UserProtectedWrapper=({children})=>{
    const token =localStorage.getItem('captainToken')
    const navigate=useNavigate();

    useEffect(() => {
        if (!token) {
          navigate("/captain-login");
        }
      }, [token, navigate]);
    
      if (!token) {
        return null;
      }
      return(
        <>
        {children}
        </>
      )
}
export default UserProtectedWrapper