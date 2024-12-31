

// import '../../App.css'
import { useUser } from '../../context/UserContext';
function UserLogin() {
  const {
    data,
    handleChange,
    error,
    handleGoogleSignUp,
    handleLogin,
    handleGithubSignUp,
    handleResetPassword,
  }=useUser();
  return (
    <div className="p-5 w-full h-screen">
      {error &&  <p className='mx-5 p-5 font-semibold text-red-500 text-xk border border-black rounded'>{error}</p>}
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
            <p className="text-red-500">{error}</p>
        <button
          type="submit"
          className="w-full bg-black text-white p-2 mt-2 rounded font-semibold"
          >
          Login
        </button>
        </form>
        <button className='text-blue-500 p-1  ms-16  rounded text-center w-[60vw] ' onClick={handleResetPassword}>Forgot Password?</button>
        <div className='flex flex-col items-center justify-between  p-4'>
        <p>OR</p>
        <button
          type="submit"
          className="w-full text-blue-500 p-2 mt-2 rounded font-semibold" 
          onClick={handleGoogleSignUp}
          >
          Don&apos;t Have an Account? Signup
        </button>
        <button
          type="submit"
          className="w-full  border border-black text-black p-2 mt-2 rounded font-semibold" 
          onClick={handleGoogleSignUp}
          >
          <i className="fa-brands fa-google mr-1"></i> Google
        </button>
        <button
          type="submit"
          className="w-full  border border-black text-black p-2 mt-2 rounded font-semibold" 
          onClick={handleGithubSignUp}
          >
          <i className="fa-brands fa-github mr-1 w-4"></i> Github
        </button>
            </div>
    </div>
  );
}

export default UserLogin;
