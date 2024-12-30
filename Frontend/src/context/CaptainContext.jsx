import { createContext, useState, useContext, useEffect } from 'react';
import { auth, db } from '../../firebaseConfig';
import { signInWithPopup, GoogleAuthProvider, GithubAuthProvider, signInWithEmailAndPassword, createUserWithEmailAndPassword, sendEmailVerification, signOut, sendPasswordResetEmail } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { doc, setDoc } from 'firebase/firestore';
import PropTypes from 'prop-types';

const CaptainContext = createContext();

export const useCaptainAuth = () => {
    return useContext(CaptainContext);
};

export const CaptainAuthProvider = ({ children }) => {
    const navigate = useNavigate();
    const [captainData, setCaptainData] = useState({ firstname: '', lastname: '', email: '', password: '', phoneNumber: '' });
    const [vehicleInfo, setVehicleInfo] = useState({ color: '', numberPlate: '', capacity: 1, vehicleType: '' });
    const [captain, setCaptain] = useState(null);
    const [error, setError] = useState('');
    const [isVerified, setIsVerified] = useState(false);
    const [message, setMessage] = useState('');
    const GoogleProvider = new GoogleAuthProvider();
    const GithubProvider = new GithubAuthProvider();

    // Handle changes for captain
    const handleCaptainChange = (e) => {
        const { name, value } = e.target;
        setCaptainData({
            ...captainData,
            [name]: value,
        });
    };
    const handleVechileChange = (e) => {
        const { name, value } = e.target;
        setVehicleInfo({
            ...vehicleInfo,
            [name]: value,
        });
    };

    // Captain signup
    const handleCaptainSignup = async (e) => {
        e.preventDefault();
        try {
            const CaptainCredential = await createUserWithEmailAndPassword(auth, captainData.email, captainData.password);
            const captain = CaptainCredential.user;
            await sendEmailVerification(captain);
            const CaptainToken = await captain.getIdToken();
            localStorage.setItem('captainToken', CaptainToken);
            await setDoc(doc(db, 'captains', captain.uid), {
                firstname: captainData.firstname,
                lastname: captainData.lastname,
                email: captain.email,
                phoneNumber: captainData.phoneNumber,
                vehicleInfo:{
                    color: vehicleInfo.color,
                    capacity: vehicleInfo.capacity,
                    numberPlate: vehicleInfo.numberPlate,
                    vehicleType: vehicleInfo.vehicleType,
                }
            });
            setCaptain(captain);
            setMessage('Email has been sent. Verify your email.');
            startVerificationCheck(captain);
        } catch (e) {
            setError(e.message);
        }
    };

    const startVerificationCheck = (user) => {
        const intervalId = setInterval(async () => {
            await user.reload();
            if (user.emailVerified) {
                setIsVerified(true);
                clearInterval(intervalId);
                navigate('/dashboard');
            } else {
                setMessage('Verify your email to login.');
                await sendEmailVerification(user);
                setMessage('Verification link expired. A new verification email has been sent.');
            }
        }, 5000);
    };

    // Captain signup using Google
    const handleCaptainGoogleSignup = async () => {
        try {
            const result = await signInWithPopup(auth, GoogleProvider);
            const captain = result.user;
            if (captain) {
                await setDoc(doc(db, 'captains', captain.uid), {
                    firstname: captainData.firstname,
                    lastname: captainData.lastname,
                    email: captain.email,
                    phoneNumber: captainData.phoneNumber,
                    color: vehicleInfo.color,
                    capacity: vehicleInfo.capacity,
                    numberPlate: vehicleInfo.numberPlate,
                    vehicleType: vehicleInfo.vehicleType,
                });
                navigate('/dashboard');
                setCaptain(captain);
            }
        } catch (e) {
            setError(e.message);
        }
    };

    // Captain signup using GitHub
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
                    color: vehicleInfo.color,
                    capacity: vehicleInfo.capacity,
                    numberPlate: vehicleInfo.numberPlate,
                    vehicleType: vehicleInfo.vehicleType,
                });
                navigate('/dashboard');
                setCaptain(captain);
            }
        } catch (e) {
            setError(e.message);
        }
    };

    // Captain login function
    const handleCaptainLogin = async (e) => {
        e.preventDefault();
        try {
            const CaptainCredential = await signInWithEmailAndPassword(auth, captainData.email, captainData.password);
            const captain = CaptainCredential.user;
            await captain.reload();
            if (captain.emailVerified) {
                setIsVerified(true);
                setError('');
                navigate('/dashboard');
            } else {
                setIsVerified(false);
                setError('Please verify your email before logging in.');
                await signOut(auth);
            }
        } catch (e) {
            setError(e.message);
        }
    };

    // Captain logout function
    const handleCaptainLogout = async () => {
        try {
            await signOut(auth);
            setCaptain(null);
            navigate('/');
        } catch (e) {
            setError(e.message);
        }
    };

    // Captain reset password function
    const handleCaptainResetPassword = async () => {
        try {
            await sendPasswordResetEmail(auth, captainData.email);
            alert('Password reset email sent. Check your inbox.');
        } catch (e) {
            setError(e.message);
        }
    };

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((captain) => {
            if (captain) {
                setCaptain(captain);
            } else {
                setCaptain(null);
            }
        });
        return () => unsubscribe();
    }, []);

    return (
        <CaptainContext.Provider
            value={{
                handleCaptainGoogleSignup,
                handleCaptainGithubSignUp,
                handleCaptainChange,
                handleCaptainLogin,
                handleCaptainSignup,
                handleCaptainLogout,
                handleCaptainResetPassword,
                captainData,
                setCaptainData,
                message,
                captain,
                error,
                isVerified,
                setCaptain,
                vehicleInfo,
                handleVechileChange,
            }}
        >
            {children}
        </CaptainContext.Provider>
    );
};

CaptainAuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export default CaptainAuthProvider;