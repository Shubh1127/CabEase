import { createContext, useState, useContext, useEffect } from 'react';
import { auth, db } from '../../firebaseConfig';
import { signInWithPopup, GoogleAuthProvider, GithubAuthProvider, signInWithEmailAndPassword, createUserWithEmailAndPassword, sendEmailVerification, signOut, sendPasswordResetEmail, RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { doc, setDoc } from 'firebase/firestore';
import PropTypes from 'prop-types';
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');
  const [isVerified, setIsVerified] = useState(false);
  const [data, setData] = useState({ firstname: '', lastname: '', email: '', password: '', phoneNumber: null });
  const [captainData, setCaptainData] = useState({ firstname: '', lastname: '', email: '', password: '', phoneNumber: '' });
  const [verificationCode, setVerificationCode] = useState('');
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

  const handleCatainChange=(e)=>{
    const {name,value}=e.target;
    setCaptainData({
      ...captainData,
      [name]:value
    })
  }

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

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);
      const user = userCredential.user;
      await sendEmailVerification(user);
      await setDoc(doc(db, 'users', user.uid), {
        firstname: data.firstname,
        lastname: data.lastname,
        email: user.email,
        phoneNumber: data.phoneNumber,
      });
      setUser(user);
      navigate('/dashboard');
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
      await auth.currentUser.reload(); // Refresh user data
      setIsVerified(auth.currentUser.emailVerified);
    }
  };

  const handleResetPassword = async (email) => {
    try {
      await sendPasswordResetEmail(auth, email);
      alert('Password reset email sent. Check your inbox.');
    } catch (e) {
      setError(e.message);
    }
  };

  const handlePhoneSignIn = async (phoneNumber, appVerifier) => {
    try {
      const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, appVerifier);
      setVerificationCode(confirmationResult.verificationId);
      setIsCodeSent(true);
    } catch (e) {
      setError(e.message);
    }
  };

  const verifyPhoneCode = async (code) => {
    try {
      const credential = RecaptchaVerifier.credential(verificationCode, code);
      const userCredential = await auth.signInWithCredential(credential);
      setUser(userCredential.user);
      navigate('/dashboard');
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
        handleSignup,
        handleLogout,
        checkEmailVerification,
        handleResetPassword,
        handlePhoneSignIn,
        verifyPhoneCode,
        data,
        user,
        error,
        isVerified,
        isCodeSent,
        captainData,
        setCaptainData,
        setVerificationCode,
        setIsCodeSent,
        setCaptain,
        captain,
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