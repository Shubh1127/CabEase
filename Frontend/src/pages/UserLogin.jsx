import  { useState } from 'react'
const UserLogin = () => {
  const [Data,setData] = useState({
    email: "",
    password:""
  })
  const handleChange=(e)=>{
    e.preventDefault();
    const {name,value} = e.target
    setData({
      ...Data,
      [name]:value
    })
    // console.log(Data)
  }

  return (
    <div>
      <form className="flex flex-col m-3 p-3" onSubmit={handleChange}>
      <h3 className="text-xl">What&apos;s your email?</h3>
      <input className="bg-white  border-white rounded px-4 py-2" type="email" required placeholder="enter your email" name='email' value={Data.email} onChange={handleChange}></input>
      <h3 className="text-xl">Password</h3>
      <input className="bg-white  border-white rounded px-4 py-2 " type="password"  placeholder="Password" name='password' value={Data.password} onChange={handleChange} required></input>
      <button className="bg-black text-white rounded-md px-4 py-1 w-full mt-3">Login</button>
      </form>
    </div>
  )
}

export default UserLogin