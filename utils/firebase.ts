// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API,
  authDomain: "estate-e65cc.firebaseapp.com",
  projectId: "estate-e65cc",
  storageBucket: "estate-e65cc.appspot.com",
  messagingSenderId: "425539042063",
  appId: "1:425539042063:web:041c5349500cef18191c7a",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
