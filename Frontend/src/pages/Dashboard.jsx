import { Link } from "react-router-dom"
import { useUser } from "../context/UserContext";
const Dashboard = () => {
    const {user,handleLogout}=useUser();
  return (
    <>
    <div className="flex justify-between mx-5 p-2">
    <div>Dashboard</div>
    {user ?<button onClick={handleLogout}>Logout</button>:<Link to={'/login'}>Login</Link>}
    </div>
    </>
  )
}

export default Dashboard