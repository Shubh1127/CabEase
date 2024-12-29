import { useAuth } from '../UseContext';
import { useState } from 'react';
import 'react-phone-input-2/lib/style.css';

const SignupCaptain = () => {
  const { handleCaptainChange, handleCaptainSignup, captainData, error, } = useAuth();
  const [message, setMessage] = useState('');
  return (
    <div>
      <h1 className="text-4xl mt-3 p-3 font-semibold">Uber</h1>
      <span className="text-center font-bold">
        <h3>Let&apos;s have a ride Captain</h3>
        <h2>Signup</h2>
      </span>
      <form className="flex flex-col w-3/4 mx-auto mt-2 border p-2" onSubmit={handleCaptainSignup}>
        <label htmlFor="firstname" className="font-semibold">First Name</label>
        <input
          className="border border-black rounded p-2 m-1"
          type="text"
          name="firstname"
          value={captainData.firstname}
          onChange={handleCaptainChange}
          required
        />
        <label htmlFor="lastname" className="font-semibold">Last Name</label>
        <input
          className="border border-black rounded p-2 m-1"
          type="text"
          name="lastname"
          value={captainData.lastname}
          onChange={handleCaptainChange}
        />
        <label className='font-semibold' htmlFor='Mobile'>Phone Number</label>
        <input className='border border-black rounded p-2 ' placeholder='Enter your phone Number'/>
        <label htmlFor="email" className="font-semibold">Email</label>
        <input
          className="border border-black rounded p-2 m-1"
          type="email"
          name="email"
          value={captainData.email}
          onChange={handleCaptainChange}
          required
        />
        <label htmlFor="password" className="font-semibold">Password</label>
        <input
          className="border border-black rounded p-2 m-1"
          type="password"
          name="password"
          value={captainData.password}
          onChange={handleCaptainChange}
          required
        />
        <button type="submit" className="bg-black text-white rounded p-1 mt-5">Submit</button>
        {message && <p className="text-green-500">{message}</p>}
        {error && <p className="text-red-500">{error}</p>}
      </form>
    </div>
  );
};

export default SignupCaptain;