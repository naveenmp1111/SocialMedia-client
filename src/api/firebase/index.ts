// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from 'firebase/auth'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBNm3v7f7oj2tItnkGdHk4Ffy-AG4c34qA",
  authDomain: "social-media-36c17.firebaseapp.com",
  projectId: "social-media-36c17",
  storageBucket: "social-media-36c17.appspot.com",
  messagingSenderId: "237579590952",
  appId: "1:237579590952:web:b4f96cdd8866244fa7c41d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app)

const provider = new GoogleAuthProvider();

export { auth, provider }