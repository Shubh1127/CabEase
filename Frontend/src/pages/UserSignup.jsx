import { useEffect, useState } from "react"
import { auth } from "../../firebaseConfig"
import { createUserWithEmailAndPassword } from "firebase/auth";
import axios from "axios";

const UserAuth=()=>{
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const handleSignup=async(e)=>{
    e.preventDefault();
    try{
      const userCredential = await createUserWithEmailAndPassword(auth,email,password);
      const idToken=await userCredential.user.getIdToken();
      //backend code
      useEffect(()=>{
        axios.post("http://localhost:3000/verify-email",{
          email:email,
          idToken:idToken
        }).then((res)=>{
          console.log(res.data);
        }).catch((error)=>{
          console.log(error);
        })
      },[])
    }catch(error){
      console.log(error);
    } 
  }
  return(
    <div>
      <form onSubmit={handleSignup}>
        <input type="email" placeholder="Enter your email" value={email} onChange={(e)=>setEmail(e.target.value)} required></input>
        <input type="password" placeholder="Enter your password" value={password} onChange={(e)=>setPassword(e.target.value)} required></input>
        <button type="submit">Signup</button>
      </form>
    </div>
  )
}
export default UserAuth