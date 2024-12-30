
import { useCaptainAuth } from "../../context/CaptainContext";
const LoginCaptain = () => {
  const{
    handleCaptainGoogleSignUp,
    handleCaptainGithubSignUp,
    handleCaptainLogin,
    handleCaptainChange,
    captainData,
    handleCaptainResetPassword,
    error,
  }=useCaptainAuth();
  return (
    <div>
      <h2 className="font-bold p-3 m-2 text-2xl">Uber</h2>
      <p className="font-semibold mt-5 text-center text-xl">Login</p>
      <form className="flex flex-col border m-5 p-3" onSubmit={handleCaptainLogin}>
        {error && <p></p>}
        <label className="p-1 font-semibold" htmlFor="email">Email</label>
        <input className="p-2 border border-black rounded " type="email" name="email" placeholder="Enter your email" value={captainData.email} onChange={handleCaptainChange} required></input>
        <label className="p-1 font-semibold" htmlFor="email">Password</label>
        <input className="p-2 border border-black rounded " type="password" name="password" placeholder="Enter your Password" value={captainData.password} onChange={handleCaptainChange} required></input>
        <p className="text-end text-blue-500 p-1" onClick={handleCaptainResetPassword}>Forgot Password?</p>
        <button className="border border-black text-white bg-black p-2 rounded" type="submit">Submit</button>
        {error && <p className="text-green-400 p-1">{error}</p>}
      </form>
      <div className="flex flex-col items-center gap-2">
        <p>OR</p>
        <button onClick={handleCaptainGoogleSignUp} className="border border-black rounded w-60 p-1 font-semibold"><i className="fa-brands fa-google mr-2 w-3"></i>Google</button>
        <button onClick={handleCaptainGithubSignUp} className="border border-black rounded w-60 p-1 font-semibold"><i className="fa-brands fa-github mr-1 w-4"></i>Github</button>
      </div>
    </div>
  )
}

export default LoginCaptain