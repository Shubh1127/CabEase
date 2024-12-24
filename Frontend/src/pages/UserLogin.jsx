import { useState } from "react";
import { Link } from "react-router-dom";
const UserLogin = () => {
  const [Data, setData] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setData({
      ...Data,
      [name]: value,
    });
    // console.log(Data)
  };

  return (
    <div className="flex flex-col items-start  max-w-full   h-[100vh] ">
      <img className="w-2/12 m-4" src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Uber_logo_2018.png/1200px-Uber_logo_2018.png" alt=""/>
      <form className="flex flex-col m-3 p-3" onSubmit={handleChange}>
        <h3 className="text-xl ">What&apos;s your email?</h3>
        <input
          className="bg-white border border-black rounded px-4 py-2 mb-10"
          type="email"
          required
          placeholder="enter your email"
          name="email"
          value={Data.email}
          onChange={handleChange}
        ></input>
        <h3 className="text-xl">Password</h3>
        <input
          className="bg-white border border-black rounded px-4 py-2 mb-10 "
          type="password"
          placeholder="Password"
          name="password"
          value={Data.password}
          onChange={handleChange}
          required
        ></input>
        <button className="bg-black text-white rounded-md px-4 py-1 w-full mt-3 mb-4">
          Login
        </button>
        <p>
          <Link
            className="text-blue-500 text-center mt-2 mr-16"
            to={"/signup"}
          >
            Create new Account
          </Link>
          <Link to={"/forgot"} className="text-blue-500 text-center mt-2">
            Forgot Password?
          </Link>
        </p>
      </form>
      <div>
        <Link to={"/captainlogin"} className="text-blue-500 text-center mt-2">
        <button className="border border-black py-2 px-4 mt-2 bg-green-500 w-80 mx-8 rounded text-white font-semibold  ">
          Sign in as Captain
        </button>
        </Link>
      </div>
    </div>
  );
};

export default UserLogin;
