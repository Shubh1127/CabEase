import { useAuth } from '../UseContext';

const SignupCaptain = () => {
  const { handleChange, handleSignup, captainData, error } = useAuth();

  return (
    <div>
      <h1 className="text-4xl mt-3 p-3 font-semibold">Uber</h1>
      <span className="text-center font-bold">
        <h3>Let&apos;s have a ride Captain</h3>
        <h2>Signup</h2>
      </span>
      <form className="flex flex-col w-3/4 mx-auto mt-2 border p-2" onSubmit={handleSignup}>
        <label htmlFor="firstname" className="font-semibold">First Name</label>
        <input
          className="border border-black rounded p-2 m-1"
          type="text"
          name="firstname"
          value={captainData.firstname}
          onChange={handleChange}
          required
        />
        <label htmlFor="lastname" className="font-semibold">Last Name</label>
        <input
          className="border border-black rounded p-2 m-1"
          type="text"
          name="lastname"
          value={captainData.lastname}
          onChange={handleChange}
        />
        <label htmlFor='number'>Phone Number</label>
        <input
          className="border border-black rounded p-2 m-1"
          type="text"
          name="phoneNumber"
          value={captainData.phoneNumber}
          onChange={handleChange}
          required
        />
        <label htmlFor="email" className="font-semibold">Email</label>
        <input
          className="border border-black rounded p-2 m-1"
          type="email"
          name="email"
          value={captainData.email}
          onChange={handleChange}
          required
        />
        <label htmlFor="password" className="font-semibold">Password</label>
        <input
          className="border border-black rounded p-2 m-1"
          type="password"
          name="password"
          value={captainData.password}
          onChange={handleChange}
          required
        />
        <button type="submit" className="bg-black text-white rounded p-1 mt-5">Signup</button>
      </form>
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
};

export default SignupCaptain;