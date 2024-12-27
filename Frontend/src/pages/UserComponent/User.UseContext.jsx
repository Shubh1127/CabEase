// context/AuthContext.js
import  { createContext, useState, useContext, useEffect } from 'react';
import { auth } from '../../../firebaseConfig';
import { signInWithPopup, GoogleAuthProvider, GithubAuthProvider, signInWithEmailAndPassword,createUserWithEmailAndPassword, sendEmailVerification,signOut,sendPasswordResetEmail } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user,setUser]=useState(null);
  const [error, setError] = useState('');
  const [isVerified, setIsVerified] = useState(false);
  const [data, setData] = useState({ email: '', password: '' });

  const GoogleProvider = new GoogleAuthProvider();
  const GithubProvider = new GithubAuthProvider();

  const handleGoogleSignUp = async () => {
    try {
      const result = await signInWithPopup(auth, GoogleProvider);
      const user = result.user;
      if (user) {
        navigate('/dashboard');
        setUser(user);
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
        alert('User Created');
        setUser(user);
      }
      console.log(user.email);
    } catch (e) {
      console.log(e);
      setError(e.message);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredential) => {
        const user = userCredential.user;
        setUser(user);
        sendEmailVerification(user).then(() => {
          alert('Verification Link sent to Email');
          navigate('/login');
        });
        console.log(user);
      })
      .catch((e) => {
        console.log(e);
        switch (e.code) {
          case 'auth/email-already-in-use':
            setError('Email is already in use. Please use a different email or log in.');
            break;
          case 'auth/invalid-email':
            setError('Invalid email address. Please enter a valid email.');
            break;
          case 'auth/weak-password':
            setError('Password is too weak. Use at least 6 characters.');
            break;
          case 'auth/operation-not-allowed':
            setError('Email/password sign-up is not enabled. Contact support.');
            break;
          case 'auth/network-request-failed':
            setError('Network error. Check your internet connection.');
            break;
          default:
            setError('An error occurred: ' + e.message);
        }
      });
  };

    const handleLogin=async(e)=>{
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
            switch (e.code) {
                case 'auth/invalid-email':
                    setError('Invalid email address. Please enter a valid email.');
                    break;
                case 'auth/user-disabled':
                    setError('User account is disabled. Contact support.');
                    break;
                case 'auth/user-not-found':
                    setError('User not found. Please sign up.');
                    break;
                case 'auth/invalid-credential':
                    setError('Invalid credentials. Please try again.');
                    break;
                case 'auth/wrong-password':
                    setError('Wrong password. Please try again.');
                    break;
                case 'auth/network-request-failed':
                    setError('Network error. Check your internet connection.');
                    break;
                default:
                    setError('An error occurred: ' + e.message);
                }
            
    }
    }
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
      await auth.currentUser.reload(); // Refresh user data
      setIsVerified(auth.currentUser.emailVerified);
    }
  };

  const handleResetPassword = async (email) => {
    if (!data.email) {
        setError("Please enter your email to reset the password");
        return;
      }
    try {
      await sendPasswordResetEmail(auth, email);
      alert('Password reset email sent. Check your inbox.');
    } catch (e) {
        console.log(e);
      setError(e.message);
    }
};


    useEffect(() => {
        const interval = setInterval(checkEmailVerification, 5000); // Check every 5 seconds
        return () => clearInterval(interval); // Clean up interval on unmount  
    }
    , []);
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
        handleSubmit,
        data,
        user,
        error,
        isVerified,
        handleLogout,
        handleResetPassword,
        handleLogin
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
  AuthProvider.propTypes = {
    children: PropTypes.node.isRequired
  };

