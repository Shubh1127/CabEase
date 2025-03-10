import { Link } from 'react-router-dom';
import { useCaptainAuth } from '../../context/CaptainContext';
import 'react-phone-input-2/lib/style.css';

const SignupCaptain = () => {
  const { handleCaptainChange, handleCaptainSignup, captainData, error,handleCaptainGoogleSignup,message,vehicleInfo,handleVechileChange } = useCaptainAuth();
  return (
    <div className='h-screen'>
      <h1 className="text-4xl mt-3 p-3 font-semibold">Uber</h1>
      <span className="text-center font-bold">
       {message && <p className='bg-green-400 w-10/12 ms-10 border border-black rounded p-2 text-white'>{message}</p> 
       || <p className='text-xl'>Let&apos;s have a ride captain</p>}
      </span>
      <form className="flex flex-col w-3/4 mx-auto mt-2 border p-2" onSubmit={handleCaptainSignup}>
      <div className='flex'>
        <div className='flex flex-col'>
        <label htmlFor="firstname" className="font-semibold ms-1">First Name</label>
        <input
          className="border border-black rounded p-2 m-1 w-10/12"
          type="text"
          name="firstname"
          
          value={captainData.firstname}
          onChange={handleCaptainChange}
          required
          />
          </div>
          <div className='flex flex-col '>
        <label htmlFor="lastname" className="font-semibold ms-1">Last Name</label>
        <input
          className="border border-black rounded p-2 m-1 w-10/12"
          type="text"
          name="lastname"
          value={captainData.lastname}
          onChange={handleCaptainChange}
          />
          </div>
          </div>
        <label className='font-semibold ms-1' htmlFor='Mobile'>Phone Number</label>
        <input className='border border-black rounded p-2 m-1 ' name='phoneNumber' value={captainData.phoneNumber} onChange={handleCaptainChange} placeholder='Enter your phone Number'/>
        <label htmlFor="email" className="font-semibold ms-1">Email</label>
        <input
          className="border border-black rounded p-2 m-1"
          type="email"
          name="email"
          value={captainData.email}
          onChange={handleCaptainChange}
          required
        />
        <label htmlFor="password" className="font-semibold ms-1">Password</label>
        <input
          className="border border-black rounded p-2 m-1"
          type="password"
          name="password"
          value={captainData.password}
          onChange={handleCaptainChange}
          required
        />
        <label htmlFor='Vehicle' className='font-semibold mt-2 mb-2 ms-2'>Vehicle Info</label>
        <div className='flex'>
        <div className='flex flex-col'>
        <label htmlFor="color" className="font-semibold ms-1">Color</label>
        <input
          className="border border-black rounded p-2 m-1 w-10/12"
          type="text"
          name="color"
          value={vehicleInfo.color}
          onChange={handleVechileChange}
          required
          />
          </div>
          <div className='flex flex-col '>
        <label htmlFor="numberPlate" className="font-semibold ms-1">Number Plate</label>
        <input
          className="border border-black rounded p-2 m-1 w-10/12"
          type="text"
          name="numberPlate"
          value={vehicleInfo.numberPlate}
          onChange={handleVechileChange}
          />
          </div>
          </div>
        <div className='flex'>
        <div className='flex flex-col'>
        <label htmlFor="lastname" className="font-semibold ms-1">Vehcile Type</label>
        <select
          className="border border-black rounded p-2 m-1 w-10/12  hover:cursor-pointer "
          name="vehicleType"
          value={vehicleInfo.vehicleType}
          onChange={handleVechileChange}
          required
        >
          <option value="">Select Vehicle Type</option>
          <option value="car">car</option>
          <option value="moto">moto</option>
          <option value="auto">auto</option>
        </select>
          </div>
          <div className='flex flex-col ms-6 '>
        <label htmlFor="capacity" className="font-semibold ms-1">Capacity</label>
        <input
          className="border border-black rounded p-2 m-1 w-10/12"
          type="number"
          name="capacity"
          value={vehicleInfo.capacity}
          min={1}
          {...(vehicleInfo.vehicleType==='car' && {max:4})}
          {...(vehicleInfo.vehicleType==='moto' && {max:1})}
          {...(vehicleInfo.vehicleType==='auto' && {max:4})}
          onChange={handleVechileChange}
          required
          />
          </div>
          </div>
        <button type="submit" className="bg-black text-white rounded p-1 mt-5">Submit</button>
        {message && <p className="text-green-500">{message}</p>}
        {error && <p className="text-red-500">{error}</p>}
      </form>
      <div className='flex flex-col items-center justify-center gap-3  h-[10rem]'>
        <Link to={'/captain-login'}><p className='text-blue-500 mt-1'>Already have an account? Login</p></Link>
        <p className='mb-3'>OR</p>
        <button className='border border-black rounded p-1 w-[60vw] ' onClick={handleCaptainGoogleSignup}><i className="fa-brands fa-google mr-1 w-4"></i>Google</button>
      </div>
      {/* <div className='w-full'>
      <Link to='/signup' className='  bg-green-600 p-3 mx-auto rounded text-center text-white font-medium w-screen mt-12 mb-2'>Sign up as User</Link>
      </div> */}
    </div>
  );
};

export default SignupCaptain;