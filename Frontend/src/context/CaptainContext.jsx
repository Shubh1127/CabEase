import { createContext, useState, useContext, useEffect } from 'react';
import { auth, db } from '../../firebaseConfig';
import { signInWithPopup, GoogleAuthProvider, GithubAuthProvider, signInWithEmailAndPassword, createUserWithEmailAndPassword, sendEmailVerification, signOut, sendPasswordResetEmail } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { doc, setDoc } from 'firebase/firestore';
import PropTypes from 'prop-types';
import axios from 'axios';
import BASE_URL from './Config';
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

    const setTokenWithExpiry = (key, value, expiryInMinutes) => {
        const now = new Date();
        const item = {
            value: value,
            expiry: now.getTime() + expiryInMinutes * 60 * 1000,
        };
        localStorage.setItem(key, JSON.stringify(item));
    };
    const getTokenWithExpiry = (key) => {
        const itemStr = localStorage.getItem(key);
        if (!itemStr) {
            return null;
        }
        const item = JSON.parse(itemStr);
        const now = new Date();
        if (now.getTime() > item.expiry) {
            localStorage.removeItem(key);
            return null;
        }
        return item.value;
    };

    const refershToken=async()=>{
        try{
            const response = await axios.post(`${BASE_URL}/captains/refresh-token`, {}, {
                withCredentials: true,
            })
            const newAccessToken=response.data.accessToken;
            setTokenWithExpiry('captainToken',newAccessToken, 15);
        }catch(err){
            console.log(err);
        }
    }

    // Captain signup
    const handleCaptainSignup = async (e) => {
        console.log(captainData.phoneNumber)
        e.preventDefault();
        try {
            const response=await axios.post(`${BASE_URL}/captains/register`,{
                fullname:{
                    firstname: captainData.firstname,
                    lastname: captainData.lastname,
                },
                email: captainData.email,
                password: captainData.password,
                phoneNumber: captainData.phoneNumber,
                vehicle:{
                    color: vehicleInfo.color,
                    capacity: vehicleInfo.capacity,
                    plate: vehicleInfo.numberPlate,
                    vehicleType: vehicleInfo.vehicleType,
                }
            })
            const captainToken=response?.data?.accessToken;
            setCaptain(response?.data?.captain);
            setTokenWithExpiry('captainToken',captainToken, 15);
            const CaptainCredential = await createUserWithEmailAndPassword(auth, captainData.email, captainData.password);
            const captain = CaptainCredential.user;
            await sendEmailVerification(captain);
            await setDoc(doc(db, 'captains', captain.uid), {
                fullname:{
                    firstname: captainData.firstname,
                    lastname: captainData.lastname,
                },
                email: captain.email,
                phoneNumber: captainData.phoneNumber,
                vehicle:{
                    color: vehicleInfo.color,
                    capacity: vehicleInfo.capacity,
                    plate: vehicleInfo.numberPlate,
                    vehicleType: vehicleInfo.vehicleType,
                }
            });
            setMessage('Email has been sent. Verify your email.');
            startVerificationCheck(captain);
        } catch (e) {
            switch(e.code){
                case 'auth/email-already-in-use':
                    setError('Email already in use');
                    break;
                case 'auth/invalid-email':
                    setError('Invalid email');
                    break;
                case 'auth/weak-password':
                    setError('Weak password');
                    break;
                case 'auth/operation-not-allowed':
                    setError('Operation not allowed');
                    break;
                case 'auth/network-request-failed':
                    setError('Check your Network ');
                    break;
                default:
                    setError('Something went wrong');
                    console.log(e);
            }
        }
    };

    const startVerificationCheck = (user) => {
        const intervalId = setInterval(async () => {
            await user.reload();
            if (user.emailVerified) {
                setIsVerified(true);
                clearInterval(intervalId);
                navigate('/captain-home');
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
            console.log('button was clicked')
            const result = await signInWithPopup(auth, GoogleProvider);
            const captain = result.user;
            if (captain) {
                const captainIdToken=await captain.getIdToken();
                setTokenWithExpiry('idToken',captainIdToken,48*60)
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
                const response=await axios.post(`${BASE_URL}/captains/register`,{
                    fullname:{
                        firstname: captainData.firstname,
                        lastname: captainData.lastname,
                    },
                    email: captain.email,
                    phoneNumber: captainData.phoneNumber,
                    vehicle:{
                        color: vehicleInfo.color,
                        capacity: vehicleInfo.capacity,
                        plate: vehicleInfo.numberPlate,
                        vehicleType: vehicleInfo.vehicleType,
                    }
                })
                const captainToken=response?.data?.accessToken;
                setTokenWithExpiry('captainToken',captainToken, 15);
                setCaptain(response?.data?.captain);
                navigate('/captain-home');
                setCaptain(captain);
            }
        } catch (e) {
            switch(e.code){
                case 'auth/email-already-in-use':
                    setError('Email already in use');
                    break;
                case 'auth/invalid-email':
                    setError('Invalid email');
                    break;
                case 'auth/weak-password':
                    setError('Weak password');
                    break;
                case 'auth/operation-not-allowed':
                    setError('Operation not allowed');
                    break;
                case 'auth/network-request-failed':
                    setError('Check your Network ');
                    break;
                default:
                    setError('Something went wrong');
            }
        }
    };

    // Captain signup using GitHub
    const handleCaptainGithubSignUp = async () => {
        try {
            const result = await signInWithPopup(auth, GithubProvider);
            const captain = result.user;
            if (captain) {
                localStorage.setItem('captainToken',await captain.getIdToken())
                await setDoc(doc(db, 'captains', captain.uid), {
                    firstname: captainData.firstname,
                    lastname: captainData.lastname,
                    email: captain.email,
                    vehicleInfo:{
                        color: vehicleInfo.color,
                        capacity: vehicleInfo.capacity,
                        numberPlate: vehicleInfo.numberPlate,
                        vehicleType: vehicleInfo.vehicleType,
                    }
                });
                navigate('/captain-home');
                setCaptain(captain);
            }
        } catch (e) {
            switch(e.code){
                case 'auth/email-already-in-use':
                    setError('Email already in use');
                    break;
                case 'auth/invalid-email':
                    setError('Invalid email');
                    break;
                case 'auth/weak-password':
                    setError('Weak password');
                    break;
                case 'auth/operation-not-allowed':
                    setError('Operation not allowed');
                    break;
                case 'auth/network-request-failed':
                    setError('Check your Network ');
                    break;
                default:
                    setError('Something went wrong');
            }
        }

    };

    // Captain login function
    const handleCaptainLogin = async (e) => {
        e.preventDefault();
        if(!captainData.email || !captainData.password){
            setError('Please fill all the fields');
            return;
        }
        try {
            const response=await axios.post(`${BASE_URL}/captains/login`,{
                email:captainData.email,
                password:captainData.password
            },{
                withCredentials:true,
            })
            const cap=response?.data?.Captain;
            localStorage.setItem('captain',JSON.stringify(cap));
            const token=response?.data?.accessToken;
            setTokenWithExpiry('captainToken',token, 15);
            setCaptain(cap);
            navigate('/captain-home');
        } catch(e){
            console.log(e);
            setError(e.response?.data?.message);
        }
    };

    // Captain logout function
    const handleCaptainLogout = async () => {
        try {
            await signOut(auth);
            setCaptain(null);
            setError('');
            await axios.get(`${BASE_URL}/captains/logout`, {
                withCredentials: true,
                headers: {
                    Authorization: `Bearer ${getTokenWithExpiry('captainToken')}`
                }
            })
            localStorage.removeItem('captainToken');
            localStorage.removeItem('captain');
        
            navigate('/');
        } catch (e) {
            setError(e.message);
        }
    };

    const fetchCaptainProfile=async()=>{
        try{
            const response=await axios.get(`${BASE_URL}/captains/profile`,{
                withCredentials:true,
                headers:{
                    Authorization:`Bearer ${getTokenWithExpiry('captainToken')}`
                }
            })
            return response;
        }catch(err){
            console.log(err);
            if (error.response && error.response.data) {
                setError(error.response.data.message); // Show backend error message
            } else {
                setError('Something went wrong');
            }
        }
    }
    // Captain reset password function
    const handleCaptainResetPassword = async () => {
        try {
            await sendPasswordResetEmail(auth, captainData.email);
            alert('Password reset email sent. Check your inbox.');
        } catch (e) {
            setError(e.message);
        }
    };

    useEffect(()=>{
        const initializer=async()=>{
            await refershToken();
            const token=getTokenWithExpiry('captainToken');
            if(token){
                
                const response=await fetchCaptainProfile();
                if(response){
                    localStorage.setItem('captain',JSON.stringify(response.data));
                    setCaptain(response.data);
                }
        }
    }
    initializer();
},[])

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
                getTokenWithExpiry
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