import { getAuth } from "firebase/auth";

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBIXHIR54VEEjyAXATJ4KJn9orqVD9ohCk",
  authDomain: "pingme-6cd4d.firebaseapp.com",
  projectId: "pingme-6cd4d",
  storageBucket: "pingme-6cd4d.firebasestorage.app",
  messagingSenderId: "586126096027",
  appId: "1:586126096027:web:5142d5185e773765d4f83e",
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const auth = getAuth(app);

export { auth, db };
