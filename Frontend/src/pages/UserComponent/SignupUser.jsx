import { Link } from 'react-router-dom';
import { useUser } from '../../context/UserContext';
function SignupUser(){
    const {
        handleGoogleSignUp,
        handleGithubSignUp,
        data,
        handleChange,
        error,
        handleSubmit,
        message
    }=useUser();
    return (
        <>
        <div className='h-screen '>
            <h1 className='mx-5 p-3 font-bold text-[25px]'>Uber</h1>
        <div className="h-max flex flex-col items-center justify-evenly">
            {message && <p className='border border-black bg-green-400 rounded p-2'>{message}</p>}
             {error && <p className='border border-black text-red-500 rounded p-2'>{error}</p>}
            <form className="flex flex-col  gap-1 m-4 p-4 w-80 " onSubmit={handleSubmit}>
                <label htmlFor='name' className='font-semibold'>First Name</label>
                <input className="border border-black rounded py-2 px-2" type="text" name="firstname"  value={data.firstname} onChange={handleChange} required />
                <label htmlFor='name' className='font-semibold'>Last Name</label>
                <input className="border border-black rounded py-2 px-2" type="text" name="lastname"  value={data.lastname} onChange={handleChange} />
                <label className="font-semibold" htmlFor="phone">Phone Number</label>
                <input className="border border-black rounded py-2 px-2" type="number" name="phoneNumber" maxLength={10} id="phone" value={data.phoneNumber} onChange={handleChange} required />
                <label className="font-semibold" htmlFor="email">Email</label>
                <input className="border border-black rounded py-2 px-2" type="email" name="email" id="email" value={data.email} onChange={handleChange} required />
                <label className="font-semibold" htmlFor="password">Password</label>
                <input className="border border-black rounded py-2 px-2" type="password" name="password" id="password" value={data.password} onChange={handleChange} required />
                {/* <p className='text-red-500 font-bold'>{error}</p> */}
                <button type="submit" className="w-full bg-black text-white p-2 mt-2 rounded font-semibold">Signup</button>
                <Link to='/login' className='text-blue-500  p-1  text-center'>Already have Account? Login Here
                </Link>
            </form>
            <p>
                OR
            </p>
            <div className='flex flex-col items-center justify-center'>
            <button className="text-black w-[60vw] border border-black rounded  p-2 mt-2 font-semibold " onClick={handleGoogleSignUp}><i className="fa-brands fa-google mr-1"></i> Google</button>
            <button className="text-black w-[60vw] rounded border border-black p-2 mt-2 font-semibold flex items-center justify-center gap-2 " onClick={handleGithubSignUp}><i className="fa-brands fa-github mr-1 w-3"></i>Github</button>
            </div>
            <Link to='/captain-signup' className='  bg-green-600 p-3 rounded text-center text-white font-medium w-80 mt-12 mb-2'>Sign up as Captain</Link> 
        </div>
        </div>
        </>
    )
}
export default SignupUser;