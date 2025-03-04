// filepath: /path/to/frontend/firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyA0a9dVvmagYq_mrcqBlIzmJPlFstAMVKQ",
  authDomain: "uber-786eb.firebaseapp.com",
  projectId: "uber-786eb",
  storageBucket: "uber-786eb.appspot.com",
  messagingSenderId: "217868560778",
  appId: "1:217868560778:web:f8fbc4be3cd44c12fd8073",
  measurementId: "G-PPKJ1XNWVS"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db=getFirestore(app);
export { auth,db};