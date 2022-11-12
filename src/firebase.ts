// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDHUPCUzc3g2QfZRIli38EBKWYpvvH_XnA",
  authDomain: "vac-inventory.firebaseapp.com",
  projectId: "vac-inventory",
  storageBucket: "vac-inventory.appspot.com",
  messagingSenderId: "754248513046",
  appId: "1:754248513046:web:040457326aede6f0dfa737"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const secondaryApp = initializeApp(firebaseConfig, "Secondary");

// exports
export const auth = getAuth(app);
export default app;