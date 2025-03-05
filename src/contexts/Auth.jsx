/* eslint-disable react/prop-types */


import { useState, createContext, useEffect, useContext, useCallback } from "react";
import { auth, db } from "../config/firebase";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";

const AuthContext = createContext({ user: null, isLoading: true });

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });

  const clear = () => {
    setUser(null);
    setIsLoading(false);
  };

  // const authStateChanged = useCallback(()=> {
  //   async (user) => {
  //   setIsLoading(true);

  //   if (!user) {
  //     clear();
  //     return;}
  //   },[])

    // const userDoc = await getDoc(doc(db, "users", user.uid));

    // if (userDoc.exists()) {
    //   setUser({
    //     firstname: userDoc.data().firstname,
    //     lastname: userDoc.data().lastname,
    //     uid: user.uid,
    //     email: user.email,
    //   });
    // }
    // else {
    //   setUser({
    //     firstname: "",
    //     lastname: "",
    //     uid: user.uid,
    //     email: user.email,
    //   });
    // }

    setIsLoading(false);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser)=>{
      setIsLoading(true);

      try{
        if(!firebaseUser) {
          setUser(null);
          setisLoading(false);
        }
      } catch(e) {
        setUser(null);
        throw new Error(e);
      }
    });
    return () => unsubscribe();
  }, []);

  const signUp = async (firstname, lastname, email, password) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      setUserData({ firstname, lastname, email, password });

      await setDoc(doc(db, "users", user.uid), {
        firstname: firstname,
        lastname: lastname,
        email: email,
        pfp: "",
        about: "",
        createdAt: serverTimestamp(),
      });

      console.log(userCredential);
      return userCredential;
    } catch (error) {
      console.error(error);
    }
  };

  const login = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      setUserData((prev) => ({ ...prev, email: userCredential.user.email }));
      return userCredential;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AuthContext.Provider
      value={{ userData, setUserData, user, signUp, login, isLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };
