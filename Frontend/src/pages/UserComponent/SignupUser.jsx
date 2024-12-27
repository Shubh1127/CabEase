import { Link } from 'react-router-dom';
import { useAuth } from './User.UseContext';
function SignupUser(){
    const {
        handleGoogleSignUp,
        handleGithubSignUp,
        data,
        handleChange,
        error,
        handleSubmit
    }=useAuth();
    return (
        <>
        <div className='h-screen'>
            <h1 className='mx-5 p-3 font-bold text-[25px]'>Uber</h1>
        <div className="p-4  h-max flex flex-col items-center justify-between">
            <form className="flex flex-col  gap-1 m-4 p-4 w-80 " onSubmit={handleSubmit}>
                <label className="font-semibold" htmlFor="email">Email</label>
                <input className="border border-black rounded py-2 px-2" type="email" name="email" id="email" value={data.email} onChange={handleChange} />
                <label className="font-semibold" htmlFor="password">Password</label>
                <input className="border border-black rounded py-2 px-2" type="password" name="password" id="password" value={data.password} onChange={handleChange} />
                <p className='text-red-500 font-bold'>{error}</p>
                <button type="submit" className="w-full bg-black text-white p-2 mt-2 rounded font-semibold">Signup</button>
                <Link to='/login' className='text-blue-500 bg-black p-1 rounded text-center'>Already have Account? Login Here
                </Link>
            </form>
            <p>
                OR
            </p>
            <div>
            <button className="bg-black w-full rounded text-white p-2 mt-2 font-semibold " onClick={handleGoogleSignUp}>Sign Up with Google</button>
            <button className="bg-black w-full rounded text-white p-2 mt-2 font-semibold " onClick={handleGithubSignUp}>Sign Up with Github</button>
            </div>
        </div>
        </div>
        </>
    )
}
export default SignupUser;