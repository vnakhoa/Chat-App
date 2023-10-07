// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDW6NRRKfzNBl3Q9MKQnGOET6-FSzBdJjU",
    authDomain: "fir-chat-55d9b.firebaseapp.com",
    projectId: "fir-chat-55d9b",
    storageBucket: "fir-chat-55d9b.appspot.com",
    messagingSenderId: "592183236550",
    appId: "1:592183236550:web:b9df737c570cd9a75504c7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
console.log(auth, 'auth')

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);
console.log(db)