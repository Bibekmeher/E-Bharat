// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDdXJKF1KiwF_j-eSXxrGYn8RYs0bGUmvk",
    authDomain: "e-bharat-d80dd.firebaseapp.com",
    projectId: "e-bharat-d80dd",
    storageBucket: "e-bharat-d80dd.appspot.com",
    messagingSenderId: "153723970351",
    appId: "1:153723970351:web:484ea6216de397095f37da"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const fireDB = getFirestore(app);
const auth = getAuth(app);

export { fireDB, auth }