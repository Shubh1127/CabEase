
const UserLogin = () => {

  return (
    <div>
      <form className="flex flex-col m-3 p-3 ">
      <h3 className="text-xl">Whats your email?</h3>
      <input className="border  border-black rounded" type="email" required placeholder="enter your email"></input>
      <h3 className="text-xl">Password</h3>
      <input className="border  border-black rounded" type="password"  placeholder="Password" required></input>
      <button className="bg-black text-white rounded-md mt-2">Login</button>
      </form>
    </div>
  )
}

export default UserLogin