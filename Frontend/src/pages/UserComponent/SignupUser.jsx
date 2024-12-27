import { auth } from '../../../firebaseConfig'
import { useEffect, useState } from "react";
import { createUserWithEmailAndPassword,signInWithPopup,GoogleAuthProvider, sendEmailVerification,GithubAuthProvider } from "firebase/auth";
import { Link } from 'react-router-dom';
function SignupUser(){
    const GithubProvider=new GithubAuthProvider();
    const GoogleProvider=new GoogleAuthProvider();
    const [isVerified, setIsVerified] = useState(false);
    const [error, setError] = useState("");
    const handleGithubSignUp=async ()=>{
        try{
            const result=await signInWithPopup(auth,GithubProvider);
            const user=result.user;
            if(user){
                alert('User Created');
            }
            console.log(user.email);
        }catch(e){
            console.log(e)
            setError(e.message);
        }
    }

    const handleGoogleSignUp=async ()=>{
        try{
            const result=await signInWithPopup(auth,GoogleProvider);
            const user=result.user;
            console.log(user);
        }catch(e){
            console.log(e)
            setError(e.message);
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
                switch (e.code) {
                    case "auth/email-already-in-use":
                      setError("Email is already in use. Please use a different email or log in.");
                      break;
                    case "auth/invalid-email":
                      setError("Invalid email address. Please enter a valid email.");
                      break;
                    case "auth/weak-password":
                      setError("Password is too weak. Use at least 6 characters.");
                      break;
                    case "auth/operation-not-allowed":
                      setError("Email/password sign-up is not enabled. Contact support.");
                      break;
                    case "auth/network-request-failed":
                      setError("Network error. Check your internet connection.");
                      break;
                    default:
                      setError("An error occurred: " + error.message);
                    }
                    console.log(e.code);
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
        <>
        <div className='h-screen'>
            <h1 className='mx-5 p-3 font-bold text-[25px]'>Uber</h1>
        <div className="p-4  h-max flex flex-col items-center justify-between">
            <form className="flex flex-col  gap-1 m-4 p-4 w-80 " onSubmit={handleSubmit}>
                <label className="font-semibold" htmlFor="email">Email</label>
                <input className="border border-black rounded py-2 px-2" type="email" name="email" id="email" value={Data.email} onChange={(e)=>setData({...Data,email:e.target.value})} />
                <label className="font-semibold" htmlFor="password">Password</label>
                <input className="border border-black rounded py-2 px-2" type="password" name="password" id="password" value={Data.password} onChange={(e)=>setData({...Data,password:e.target.value})} />
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