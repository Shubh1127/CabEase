import { createContext, useState, useContext, useEffect } from 'react';
import { auth, db } from '../../firebaseConfig';
import { signInWithPopup, GoogleAuthProvider, signInWithEmailAndPassword, createUserWithEmailAndPassword, sendEmailVerification, signOut, sendPasswordResetEmail } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { doc, setDoc } from 'firebase/firestore';
import PropTypes from 'prop-types';
import axios from 'axios';
const UserContext = createContext();

export const useUser = () => {
    return useContext(UserContext);
};

export const UserProvider = ({ children }) => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [error, setError] = useState('');
    const [isVerified, setIsVerified] = useState(false);
    const [message, setMessage] = useState('');
    const [data, setData] = useState({ firstname: '', lastname: '', email: '', password: '', phoneNumber: '' ,authProvider:'local'});
    const GoogleProvider = new GoogleAuthProvider();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData({
            ...data,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);
            const user = userCredential.user;
            await sendEmailVerification(user);
            const idToken = await user.getIdToken();
            localStorage.setItem('idToken', idToken);
            await setDoc(doc(db, 'users', user.uid), {
                firstname: data.firstname,
                lastname: data.lastname,
                email: user.email,
                phoneNumber: data.phoneNumber,
            });
            await axios.post('http://localhost:3000/users/register',data)

            setMessage('Verification email is sent. Verify your email first.');
            startVerificationCheck(user);
        } catch (e) {
            setError(e.message);
            switch(e.code){
                case 'auth/email-already-in-use':
                    setError('Email already in use');
                    break;
                case 'auth/weak-password':
                    setError('Password should be at least 6 characters');
                    break;
                case 'auth/invalid-email':
                    setError('Invalid email');
                    break;
                case 'auth/operation-not-allowed':
                    setError('Email verification is not allowed for this project');
                    break;
                case 'auth/argument-error':
                    setError('Invalid argument');
                    break;
                case 'auth/too-many-requests':
                    setError('Too many requests. Try again later');
                    break;
                case 'auth/network-request-failed':
                    setError('Check your Network Conection');
                    break;
                default:
                    setError('Something went wrong');
                    }
        }
    };

    const handleGoogleSignUp = async () => {
        try {
            const result = await signInWithPopup(auth, GoogleProvider);
            const user = result.user;
            if (user) {
                const idToken = await user.getIdToken();
                localStorage.setItem('idToken', idToken);
                const fullName = user.displayName || '';
                const [firstname, lastname] = fullName.split(' ') || ['', ''];
                let phoneNumber = user.phoneNumber ||  prompt("Enter your phone number :") || '';
                phoneNumber = phoneNumber && !isNaN(phoneNumber) ? Number(phoneNumber) : null;
                console.log(fullName,phoneNumber);
                await setDoc(doc(db, 'users', user.uid), {
                    firstname,
                    lastname,
                    email: user.email,
                    phoneNumber
                });

                await axios.post('http://localhost:3000/users/register',{
                    firstname,
                    lastname,
                    email:user.email,
                    authProvider:'google',
                    phoneNumber
                })
                navigate('/dashboard');
                setUser(user);
                setMessage('');
                setError('');
            }
        } catch (e) {
            switch(e.code){
                case 'auth/email-already-in-use':
                    setError('Email already in use');
                    break;
                case 'auth/weak-password':
                    setError('Password should be at least 6 characters');
                    break;
                case 'auth/invalid-email':
                    setError('Invalid email');
                    break;
                case 'auth/operation-not-allowed':
                    setError('Email verification is not allowed for this project');
                    break;
                case 'auth/argument-error':
                    setError('Invalid argument');
                    break;
                case 'auth/too-many-requests':
                    setError('Too many requests. Try again later');
                    break;
                case 'auth/network-request-failed':
                    setError('Check your Network Conection');
                    break;
                default:
                    setError('Something went wrong');
                    }
        }
    };

    

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response=await axios.post('http://localhost:3000/users/login',data)
            
            const token=response.data.token;
            const user=response.data.user;
            localStorage.setItem('user',JSON.stringify(user));
            localStorage.setItem('token',token);
            navigate('/dashboard');
            setMessage('');
            setError('');
        } catch (error) {
            if (error.response && error.response.data) {
                setError(error.response.data.message); // Show backend error message
            } else {
                setError('Something went wrong');
            }
        }
    };

    const handleLogout = async () => {
        try {
            await signOut(auth);
            setUser(null);
            localStorage.removeItem('idToken');
            navigate('/');
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
            return () => unsubscribe();
        });
    }, []);

    return (
        <UserContext.Provider
            value={{
                handleGoogleSignUp,
                handleChange,
                handleLogin,
                handleSubmit,
                handleLogout,
                handleResetPassword,
                message,
                data,
                user,
                error,
                isVerified,
            }}
        >
            {children}
        </UserContext.Provider>
    );
};

UserProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export default UserProvider;