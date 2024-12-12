// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA_jkXd3WWQDzRJ_xqs_2MaqZgemIdp020",
  authDomain: "docs-clone-6189d.firebaseapp.com",
  projectId: "docs-clone-6189d",
  storageBucket: "docs-clone-6189d.firebasestorage.app",
  messagingSenderId: "265273718704",
  appId: "1:265273718704:web:f90f4b84377fe54bf38875",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
