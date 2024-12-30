// import { Link } from "react-router-dom"
// import { useUser } from "../../context/UserContext";
const Dashboard = () => {
    // const {user,handleLogout}=useUser();
  return (
    <>
    <div className="h-screen relative ">
    {/* <div className="flex justify-between mx-5 p-2">Dashboard
    {user ?<button onClick={handleLogout}>Logout</button>:<Link to={'/login'}>Login</Link>}
    </div> */}
    <img className="w-16 absolute left-5 top-5" src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt=""/>
    <div className="h-screen w-screen">
      {/* image for temporary use */}
      <img className="h-full w-full object-cover" src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif" alt=""/>
    </div>
    <div className=" h-screen flex flex-col justify-end absolute top-0 w-full ">
      <div className="h-[30%] bg-white p-5">
      <h4 className="text-2xl font-semibold">Find a Trip</h4>
      <form>
        <input className="bg-[#eee] px-12 py-2 text-base rounded-lg w-full mt-5" type="text" placeholder="Add a Pickup Location" />
        <input className="bg-[#eee] px-12 py-2 text-base rounded-lg w-full mt-3" type="text" placeholder="Enter your  destination " />
      </form>
      </div>
      <div className="h-[70%] bg-red-500 hidden">
        
      </div>
    </div>
    </div>
    </>
  )
}

export default Dashboard