import { createContext, useState, useContext, useEffect } from 'react';
import { auth, db } from '../../firebaseConfig';
import { signInWithPopup, GoogleAuthProvider, GithubAuthProvider, signInWithEmailAndPassword, createUserWithEmailAndPassword, sendEmailVerification, signOut, sendPasswordResetEmail} from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { doc, setDoc } from 'firebase/firestore';
import PropTypes from 'prop-types';
const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');
  const [isVerified, setIsVerified] = useState(false);
  const [message,setMessage]=useState('')
  const [data, setData] = useState({ firstname: '', lastname: '', email: '', password: '', phoneNumber: null });
  const [captainData, setCaptainData] = useState({ firstname: '', lastname: '', email: '', password: '', phoneNumber: '' });
  const [captain, setCaptain] = useState(null);
  const [isCodeSent, setIsCodeSent] = useState(false);

  const GoogleProvider = new GoogleAuthProvider();
  const GithubProvider = new GithubAuthProvider();

  const handleGoogleSignUp = async () => {
    try {
      const result = await signInWithPopup(auth, GoogleProvider);
      const user = result.user;
      if (user) {
        await setDoc(doc(db, 'users', user.uid), {
          firstname: data.firstname,
          lastname: data.lastname,
          email: user.email,
          phoneNumber: data.phoneNumber,
        });
        navigate('/dashboard');
        setUser(user);
      }
    } catch (e) {
      console.log(e);
      setError(e.message);
    }
  };
  const handleCaptainGoogleSignup=async()=>{
    try{
      const result=await signInWithPopup(auth,GoogleProvider);
      const captain=result.user;
      if(captain){
        await setDoc(doc(db,'captains',captain.uid),{
          firstname:captainData.firstname,
          lastname:captainData.lastname,
          email:captain.email,
          phoneNumber:captainData.phoneNumber
        })
        navigate('/dashboard')
        setCaptain(captain);
      }
    }catch(e){
      setError(e.message)
    }
  }

  const handleCaptainGithubSignUp = async () => {
    try {
      const result = await signInWithPopup(auth, GithubProvider);
      const captain = result.user;
      if (captain) {
        await setDoc(doc(db, 'captains', captain.uid), {
          firstname: captainData.firstname,
          lastname: captainData.lastname,
          email: captain.email,
          phoneNumber: captainData.phoneNumber,
        });
        navigate('/dashboard');
        setCaptain(captain);
      }
    } catch (e) {
      console.log(e);
      setError(e.message);
    }
  };
  const handleGithubSignUp = async () => {
    try {
      const result = await signInWithPopup(auth, GithubProvider);
      const user = result.user;
      if (user) {
        await setDoc(doc(db, 'users', user.uid), {
          firstname: data.firstname,
          lastname: data.lastname,
          email: user.email,
          phoneNumber: data.phoneNumber,
        });
        navigate('/dashboard');
        setUser(user);
      }
    } catch (e) {
      console.log(e);
      setError(e.message);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const handleCaptainChange=(e)=>{
    const {name,value}=e.target;
    setCaptainData({
      ...captainData,
      [name]:value
    })
  }

  const handleCaptainLogin = async (e) => {
    e.preventDefault();
    try {
      const CaptainCredential = await signInWithEmailAndPassword(auth, captainData.email, captainData.password);
      const captain = CaptainCredential.user;
      await captain.reload();
      if (captain.emailVerified) {
        setIsVerified(true);
        console.log("Login successful:", captain);
        navigate('/dashboard');
      } else {
        setIsVerified(false);
        setError("Please verify your email before logging in.");
        await signOut(auth);
      }
    } catch (e) {
      setError(e.message);
    }
  };
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, data.email, data.password);
      const user = userCredential.user;
      await user.reload();
      if (user.emailVerified) {
        setIsVerified(true);
        console.log("Login successful:", user);
        navigate('/dashboard');
      } else {
        setIsVerified(false);
        setError("Please verify your email before logging in.");
        await signOut(auth);
      }
    } catch (e) {
      setError(e.message);
    }
  };

  const handleCaptainSignup = async (e) => {
    e.preventDefault();
    try {
      const CaptainCredential = await createUserWithEmailAndPassword(auth, captainData.email, captainData.password);
      const captain = CaptainCredential.user;
      await sendEmailVerification(captain);
      await setDoc(doc(db, 'captains', captain.uid), {
        firstname: captainData.firstname,
        lastname: captainData.lastname,
        email: captainData.email,
        phoneNumber: captainData.phoneNumber,
      });
      setUser(captain);
      navigate('/dashboard');
    } catch (e) {
      setError(e.message);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);
      const user = userCredential.user;

      // Send initial verification email
      await sendEmailVerification(user);

      // Save user data in Firestore
      await setDoc(doc(db, 'users', user.uid), {
        firstname: data.firstname,
        lastname: data.lastname,
        email: user.email,
        phoneNumber: data.phoneNumber,
      });

      setMessage('Verification email is sent. Verify your email first.');
      startVerificationCheck(user);
    } catch (e) {
      setError(e.message);
    }
  };

  const startVerificationCheck = (user) => {
    const intervalId = setInterval(async () => {
      await user.reload(); // Reload user to fetch updated verification status
      if (user.emailVerified) {
        setIsVerified(true);
        clearInterval(intervalId); // Stop checking once verified
        navigate('/dashboard'); // Navigate to dashboard
      } else {
        setMessage('Verify your email first.');
        // Resend verification email if expired (check every 60 seconds for example)
        await sendEmailVerification(user);
        setMessage('Verification link expired. A new verification email has been sent.');
      }
    }, 1000); // Check every second
  };
  
  const handleCaptainLogout = async () => {
    try {
      await signOut(auth);
      setCaptain(null);
      navigate('/');
    } catch (e) {
      setError(e.message);
    }
  };
  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      navigate('/');
    } catch (e) {
      setError(e.message);
    }
  };

      const checkEmailVerification = async () => {
      if (auth.currentUser) {
        await auth.currentUser.reload(); 
        setIsVerified(auth.currentUser.emailVerified);
      }
    };

  const handleCaptainResetPassword = async () => {
    try {
      await sendPasswordResetEmail(auth, captainData.email);
      alert('Password reset email sent. Check your inbox.');
    } catch (e) {
      setError(e.message);
    }
  };
  const handleResetPassword = async () => {
    try {
      await sendPasswordResetEmail(auth, data.email);
      alert('Password reset email sent. Check your inbox.');
    } catch (e) {
      setError(e.message);
    }
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        handleGoogleSignUp,
        handleGithubSignUp,
        handleChange,
        handleLogin,
        handleSubmit,
        handleLogout,
        checkEmailVerification,
        handleResetPassword,
        captainData,
        setCaptainData,
        message,
        data,
        user,
        error,
        isVerified,
        isCodeSent,
        setIsCodeSent,
        setCaptain,
        captain,
        handleCaptainChange,
        handleCaptainGoogleSignup,
        handleCaptainGithubSignUp,
        handleCaptainSignup,
        handleCaptainResetPassword,
        handleCaptainLogout,
        handleCaptainLogin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthProvider;