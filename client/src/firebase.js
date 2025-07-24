// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-c0c11.firebaseapp.com",
  projectId: "mern-estate-c0c11",
  storageBucket: "mern-estate-c0c11.firebasestorage.app",
  messagingSenderId: "314503575443",
  appId: "1:314503575443:web:5384663e7aab1581509a66",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
