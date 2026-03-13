// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
   apiKey: "AIzaSyDzZTUGI3a0GaTCapMmC_I4wX3wSRNtZjI",
  authDomain: "organic-c5c79.firebaseapp.com",
  projectId: "organic-c5c79",
  storageBucket: "organic-c5c79.firebasestorage.app",
  messagingSenderId: "28507823597",
  appId: "1:28507823597:web:affeb231804ac516f25be4",
  measurementId: "G-1QZYLYMBCM"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
