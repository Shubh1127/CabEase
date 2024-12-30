// import { createContext, useState, useContext, useEffect } from 'react';
// import { auth, db } from '../../firebaseConfig';
// import { signInWithPopup, GoogleAuthProvider, GithubAuthProvider, signInWithEmailAndPassword, createUserWithEmailAndPassword, sendEmailVerification, signOut, sendPasswordResetEmail} from 'firebase/auth';
// import { useNavigate } from 'react-router-dom';
// import { doc, setDoc } from 'firebase/firestore';
// import PropTypes from 'prop-types';
// const AuthContext = createContext();

// export const useAuth = () => {
//   return useContext(AuthContext);
// };

// export const AuthProvider = ({ children }) => {
//   const navigate = useNavigate();
//   const [user, setUser] = useState(null);
//   const [error, setError] = useState('');
//   const [isVerified, setIsVerified] = useState(false);
//   const [message,setMessage]=useState('')
//   const [data, setData] = useState({ firstname: '', lastname: '', email: '', password: '', phoneNumber: '' });
//   const GoogleProvider = new GoogleAuthProvider();
//   const GithubProvider = new GithubAuthProvider();

//   //users authentication
//   //user handleChange function
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setData({
//       ...data,
//       [name]: value,
//     });
//   };

//   //signup
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);
//       const user = userCredential.user;
//       // console.log(user.phoneNumber,user.email)
//       // Send initial verification email
//       await sendEmailVerification(user);
//       const idToken=await user.getIdToken();
//       console.log(idToken);
//       localStorage.setItem('idToken',idToken)
//       await setDoc(doc(db, 'users', user.uid), {
//         firstname: data.firstname,
//         lastname: data.lastname,
//         email: user.email,
//         phoneNumber: data.phoneNumber,
//       });
//       setMessage('Verification email is sent. Verify your email first.');
//       startVerificationCheck(user);
//     } catch (e) {
//       setError(e.message);
//     }
//   };
//   //signup through google
//   const handleGoogleSignUp = async () => {
//     try {
//       const result = await signInWithPopup(auth, GoogleProvider);
//       const user = result.user;
//       if (user) {
//         const idToken=await user.getIdToken();
//         localStorage.setItem('idToken',idToken)
//         await setDoc(doc(db, 'users', user.uid), {
//           firstname: data.firstname,
//           lastname: data.lastname,
//           email: user.email,
//           phoneNumber: data.phoneNumber,
//         });
//         navigate('/dashboard');
//         setUser(user);
//         setMessage('')
//         setError('');
//       }
//     } catch (e) {
//       console.log(e);
//       setError(e.message);
//     }
//   };
//   //signup through github
//   const handleGithubSignUp = async () => {
//     try {
//       const result = await signInWithPopup(auth, GithubProvider);
//       const user = result.user;
//       if (user) {
//         const idToken=await user.getIdToken();
//         localStorage.setItem('idToken',idToken)
//         await setDoc(doc(db, 'users', user.uid), {
//           firstname: data.firstname,
//           lastname: data.lastname,
//           email: user.email,
//           phoneNumber: data.phoneNumber,
//         });
//         navigate('/dashboard');
//         setUser(user);
//       }
//     } catch (e) {
//       console.log(e);
//       setError(e.message);
//     }
//   };
//   //user login function
//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//       const userCredential = await signInWithEmailAndPassword(auth, data.email, data.password);
//       const user = userCredential.user;
//       const idToken=await user.getIdToken();
//       await user.reload();
//       localStorage.setItem('idToken',idToken)
//         navigate('/dashboard');
//         setMessage('');
//         setError('');
      
//     } catch (e) {
//       setError(e.message);
//     }
//   };
//   //user logout function
//   const handleLogout = async () => {
//     try {
//       await signOut(auth);
//       setUser(null);
//       localStorage.removeItem('idToken')
//       navigate('/');
//     } catch (e) {
//       setError(e.message);
//     }
//   };
//   //email verification checker for user
//   const startVerificationCheck = (user) => {
//     const intervalId = setInterval(async () => {
//       await user.reload(); 
//       if (user.emailVerified) {
//         setIsVerified(true);
//         clearInterval(intervalId); 
//         navigate('/dashboard'); 
//       } else {
//         setMessage('Verify your email to login.');
//         await sendEmailVerification(user);
//         setMessage('Verification link expired. A new verification email has been sent.');
//       }
//     }, 5000); 
//   };
//   //user reset password function
//   const handleResetPassword = async () => {
//     try {
//       await sendPasswordResetEmail(auth, data.email);
//       alert('Password reset email sent. Check your inbox.');
//     } catch (e) {
//       setError(e.message);
//     }
//   };

//     //Captain Authentication
//     const [captainData, setCaptainData] = useState({ firstname: '', lastname: '', email: '', password: '', phoneNumber: '' });
//     const [captain, setCaptain] = useState(null);
//     //handle changes for captain
//     const handleCaptainChange=(e)=>{
//       const {name,value}=e.target;
//       setCaptainData({
//         ...captainData,
//         [name]:value
//       })
//     }

//     //signup
//     const handleCaptainSignup = async (e) => {
//       e.preventDefault();
//       try {
//         const CaptainCredential = await createUserWithEmailAndPassword(auth, captainData.email, captainData.password);
//         const captain = CaptainCredential.user;
//         await sendEmailVerification(captain);
//         await setDoc(doc(db, 'captains', captain.uid), {
//           firstname: captainData.firstname,
//           lastname: captainData.lastname,
//           email: captain.email,
//           phoneNumber: captainData.phoneNumber,
//         });
//         setCaptain(captain);
//         if(!captain.emailVerified){
//           setMessage('email has been sent.verify to login')
//         }
//         navigate('/dashboard');
//       } catch (e) {
//         setError(e.message);
//       }
//     };
    
//     //captain signup using google
//     const handleCaptainGoogleSignup=async()=>{
//     try{
//       const result=await signInWithPopup(auth,GoogleProvider);
//       const captain=result.user;
//       if(captain){
//         await setDoc(doc(db,'captains',captain.uid),{
//           firstname:captainData.firstname,
//           lastname:captainData.lastname,
//           email:captain.email,
//           phoneNumber:captainData.phoneNumber
//         })
//         navigate('/dashboard')
//         setCaptain(captain);
//       }
//     }catch(e){
//       setError(e.message)
//     }
//   }

//   //captain signup using github
//   const handleCaptainGithubSignUp = async () => {
//     try {
//       const result = await signInWithPopup(auth, GithubProvider);
//       const captain = result.user;
//       if (captain) {
//         await setDoc(doc(db, 'captains', captain.uid), {
//           firstname: captainData.firstname,
//           lastname: captainData.lastname,
//           email: captain.email,
//           phoneNumber: captainData.phoneNumber,
//         });
//         navigate('/dashboard');
//         setCaptain(captain);
//       }
//     } catch (e) {
//       console.log(e);
//       setError(e.message);
//     }
//   };

//     //captain login function
//     const handleCaptainLogin = async (e) => {
//     e.preventDefault();
//     try {
//       const CaptainCredential = await signInWithEmailAndPassword(auth, captainData.email, captainData.password);
//       const captain = CaptainCredential.user;
//       await captain.reload();
//       if (captain.emailVerified) {
//         setIsVerified(true);
//         console.log("Login successful:", captain);
//         setError('')
//         navigate('/dashboard');
//       } else {
//         setIsVerified(false);
//         setError("Please verify your email before logging in.");
//         await signOut(auth);
//       }
//     } catch (e) {
//       setError(e.message);
//     }
//   };
  
//   //captain logout function
//   const handleCaptainLogout = async () => {
//     try {
//       await signOut(auth);
//       setCaptain(null);
//       navigate('/');
//     } catch (e) {
//       setError(e.message);
//     }
//   };
//   //captain reset password function
//   const handleCaptainResetPassword = async () => {
//     try {
//       await sendPasswordResetEmail(auth, captainData.email);
//       alert('Password reset email sent. Check your inbox.');
//     } catch (e) {
//       setError(e.message);
//     }
//   };
  

//   useEffect(() => {
//         const unsubscribe = auth.onAuthStateChanged((user) => {
//           if (user) {
//             setUser(user);
//           } else {
//             setUser(null);
//           }
//         return () => unsubscribe();
//       })
//   }, []);

//   return (
//     <AuthContext.Provider
//       value={{
//         handleGoogleSignUp,
//         handleGithubSignUp,
//         handleChange,
//         handleLogin,
//         handleSubmit,
//         handleLogout,
//         handleResetPassword,
//         captainData,
//         setCaptainData,
//         message,
//         data,
//         user,
//         error,
//         isVerified,
//         setCaptain,
//         captain,
//         handleCaptainChange,
//         handleCaptainGoogleSignup,
//         handleCaptainGithubSignUp,
//         handleCaptainSignup,
//         handleCaptainResetPassword,
//         handleCaptainLogout,
//         handleCaptainLogin,
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };

// AuthProvider.propTypes = {
//   children: PropTypes.node.isRequired,
// };

// export default AuthProvider;