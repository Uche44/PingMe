import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBIXHIR54VEEjyAXATJ4KJn9orqVD9ohCk",
  authDomain: "pingme-6cd4d.firebaseapp.com",
  projectId: "pingme-6cd4d",
  storageBucket: "pingme-6cd4d.firebasestorage.app",
  messagingSenderId: "586126096027",
  appId: "1:586126096027:web:5142d5185e773765d4f83e",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);

const signUp = async (username, email, password) => {
    try{
        
    }
    catch(error) {}
};
