import axios from 'axios';
import  { useState } from 'react'

const  ForgotPassword =  () => {
    const [er,setEr]=useState('');

    const [Data,setData] = useState({
    email: "",
    privateKey:""
    })
    const handleChange=(e)=>{ 
        e.preventDefault();
        const {name,value} = e.target 
        setData({ 
            ...Data,
            [name]:value
        })

    }
    const handleSubmit=async(e)=>{
        e.preventDefault()
        try{
            let info=await axios.post('http://localhost:3000/users/forgot',Data)
            console.log(info.data.message);
            }catch(e){
                console.log(e);
                setEr('Failed')
            }
        console.log(Data)
    }
    
  return (
    <div>
        {er}
        <form onSubmit={handleSubmit} className='m-6 p-4'>
            <h3 className=' font-bold'>What&apos;s your email?</h3>
                <input className='bg-white border border-black rounded-md py-2 px-4 w-full' type="email" required placeholder="enter your email" name='email'  value={Data.email} onChange={handleChange}></input>
            <h3 className=' font-bold mt-1'>Enter your personal Private key</h3>
            <input className='bg-white border border-black rounded-md py-2 px-4 w-full' type="text" required placeholder="Private key" name='privateKey' value={Data.privateKey} onChange={handleChange}></input>
            <h3 className=' font-bold mt-1'>Enter your new password</h3>
            <input className='bg-white border border-black rounded-md py-2 px-4 w-full' type="password" required placeholder="Password" name='password' value={Data.password} onChange={handleChange}></input>
            <h3 className=' font-bold mt-1'>Confirm your new password</h3>
            <input className='bg-white border border-black rounded-md py-2 px-4 w-full' type="password" required placeholder="Password" name='confirmpassword' value={Data.confirmpassword} onChange={handleChange}></input>
            <button className='bg-black text-white w-full  mt-3 py-2 px-4 rounded-md' type="submit">Submit</button>
        </form>
        </div>
  )

}

export default ForgotPassword