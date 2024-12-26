import { auth } from "../../firebaseConfig";
import { useEffect, useState } from "react";
import { createUserWithEmailAndPassword,signInWithPopup,GoogleAuthProvider, sendEmailVerification } from "firebase/auth";
function SignupUser(){
    const [isVerified, setIsVerified] = useState(false);
    const GoogleProvider=new GoogleAuthProvider();
    const handleGoogleSignUp=async ()=>{
        try{
            const result=await signInWithPopup(auth,GoogleProvider);
            const user=result.user;
            console.log(user);
        }catch(e){
            console.log(e)
        }
    }
    const handleSubmit=async (e)=>{
        e.preventDefault();
        const {name,value}=e.target;
        setData({
            ...Data,
            [name]:value
        })
        createUserWithEmailAndPassword(auth,Data.email,Data.password)
        .then((userCredential)=>{
            const user=userCredential.user;
            sendEmailVerification(user).then(()=>{
                alert('Verfication Link send to Email')
            })
            console.log(user);
        }).catch((e)=>{
                console.log(e);
        })
    }
    useEffect(() => {
        const checkEmailVerification = async () => {
          if (auth.currentUser) {
            await auth.currentUser.reload(); // Refresh user data
            setIsVerified(auth.currentUser.emailVerified);
            
          }
        };
    
        const interval = setInterval(checkEmailVerification, 5000); // Check every 5 seconds
    
        return () => clearInterval(interval); // Clean up interval on unmount
      }, []);
    const [Data,setData] = useState({
        email:"",
        password:"",
    });
    return (
        <div className="p-5">
            <form className="flex flex-col m-5 p-4" onSubmit={handleSubmit}>
                <label className="font-semibold" htmlFor="email">Email</label>
                <input className="border border-black rounded py-2 px-2" type="email" name="email" id="email" value={Data.email} onChange={(e)=>setData({...Data,email:e.target.value})} />
                <label className="font-semibold" htmlFor="password">Password</label>
                <input className="border border-black rounded py-2 px-2" type="password" name="password" id="password" value={Data.password} onChange={(e)=>setData({...Data,password:e.target.value})} />
                <button type="submit" className="w-full bg-black text-white p-2 mt-2 rounded font-semibold">Signup</button>
            </form>
            <button className="bg-black w-full rounded text-white p-2 mt-2 font-semibold " onClick={handleGoogleSignUp}>Sign Up with Google</button>

        </div>
    )
}
export default SignupUser;