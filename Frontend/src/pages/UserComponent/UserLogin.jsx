import { auth } from "../../../firebaseConfig";
import { useState } from "react";
import '../../App.css'
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
function UserLogin() {
  const navigate=useNavigate();
  const [Data, setData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [isVerified, setIsVerified] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        Data.email,
        Data.password
      );
      const user = userCredential.user;
      await user.reload(); 
      if (user.emailVerified) {
        setIsVerified(true);
        console.log("Login successful:", user);
        navigate('/captainlogin')
      } else {
        setIsVerified(false);
        setError("Please verify your email before logging in.");
        await signOut(auth); // Log out unverified user
      }
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <div className="p-5">
      <form className="flex flex-col m-5 p-4" onSubmit={handleLogin}>
        <label className="font-semibold" htmlFor="email">
          Email
        </label>
        <input
          className="border border-black rounded py-2 px-2"
          type="email"
          name="email"
          id="email"
          value={Data.email}
          onChange={(e) => setData({ ...Data, email: e.target.value })}
        />
        <label className="font-semibold" htmlFor="password">
          Password
        </label>
        <input
          className="border border-black rounded py-2 px-2"
          type="password"
          name="password"
          id="password"
          value={Data.password}
          onChange={(e) => setData({ ...Data, password: e.target.value })}
        />
        <button
          type="submit"
          className="w-full bg-black text-white p-2 mt-2 rounded font-semibold"
          >
          Login
        </button>
      </form>
      {error && <p className="text-red-600 font-semibold">{error}</p>}
      {isVerified && <p className="text-green-600 font-semibold">Welcome back!</p>}
    </div>
  );
}

export default UserLogin;
