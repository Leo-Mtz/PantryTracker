// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDFWnJLCSRRaWvTFTf8DD_dbOKWK7D2Q9k",
  authDomain: "pantryapp-57faa.firebaseapp.com",
  projectId: "pantryapp-57faa",
  storageBucket: "pantryapp-57faa.appspot.com",
  messagingSenderId: "1041447125089",
  appId: "1:1041447125089:web:6d91d7d9683d683a10aa20"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

// Export the initialized app and firestore instance
export { app, firestore };
