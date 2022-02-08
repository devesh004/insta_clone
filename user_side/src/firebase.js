// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCAdlet997jnPK7VuZhFiMViW_qjw4-V6U",
  authDomain: "insta-clone-d0e31.firebaseapp.com",
  databaseURL:
    "https://insta-clone-d0e31-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "insta-clone-d0e31",
  storageBucket: "insta-clone-d0e31.appspot.com",
  messagingSenderId: "738617744879",
  appId: "1:738617744879:web:dae5a0a7894683c71c2a1a",
  measurementId: "G-Z2BP84XD42",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;
