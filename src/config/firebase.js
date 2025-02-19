import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { getFirestore, setDoc, doc } from "firebase/firestore";
import { toast } from "react-hot-toast";
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
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await setDoc(doc(db, "users", user.uid), {
      id: user.uid,
      username: username.toLowerCase(),
      email,
      name: "",
      avatar: "",
      bio: "Hey there! I am on PingMe",
      lastSeen: Date.now(),
    });
    await setDoc(doc(db, "chats", user.uid), {
      chatData: [],
    });
  } catch (error) {
    console.error(error);
    toast.error(error.code.split("/")[1].split("-").join(""));
  }
};

const login = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.error(error);
    toast.error(error.code.split("/")[1].split("-").join(""));
  }
};
export { signUp, login };
