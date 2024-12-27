

import '../../App.css'
import {  useAuth } from './User.UseContext';
function UserLogin() {
  const {
    data,
    handleChange,
    error,
    handleGoogleSignUp,
    handleLogin,
    handleGithubSignUp,
    handleResetPassword
  }=useAuth();
  
  

  return (
    <div className="p-5 w-full h-screen">
      <form className="flex flex-col mt-5 p-4 " onSubmit={handleLogin}>
        <label className="font-semibold" htmlFor="email">
          Email
        </label>
        <input
          className="border border-black rounded py-2 px-2"
          type="email"
          name="email"
          id="email"
          value={data.email}
          onChange={handleChange}
        />
        <label className="font-semibold" htmlFor="password">
          Password
        </label>
        <input
          className="border border-black rounded py-2 px-2"
          type="password"
          name="password"
          id="password"
          value={data.password}
          onChange={handleChange}
        />
        <p className='text-black'>{error}</p>
        <button
          type="submit"
          className="w-full bg-black text-white p-2 mt-2 rounded font-semibold"
          >
          Login
        </button>
        </form>
        <button className='text-blue-500 bg-black p-1 mt-2 rounded text-center w-80 m-5' onClick={handleResetPassword}>Forgot Password?</button>
        <div className='flex flex-col items-center justify-between  p-4'>
        <p>OR</p>
        <button
          type="submit"
          className="w-full bg-black text-white p-2 mt-2 rounded font-semibold" 
          onClick={handleGoogleSignUp}
          >
          Don&apos;t Have an Account? Signup
        </button>
        <button
          type="submit"
          className="w-full bg-black text-white p-2 mt-2 rounded font-semibold" 
          onClick={handleGoogleSignUp}
          >
          Sign in with Google
        </button>
        <button
          type="submit"
          className="w-full bg-black text-white p-2 mt-2 rounded font-semibold" 
          onClick={handleGithubSignUp}
          >
          Sign in with Github
        </button>
            </div>
    </div>
  );
}

export default UserLogin;
