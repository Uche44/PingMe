/* eslint-disable react/prop-types */
import { useState, createContext, useEffect, useContext } from "react";
import { auth, db } from "../config/firebase";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { getCurrentUser } from "../hooks/useFirebase";

const AuthContext = createContext({ user: null, isLoading: true });

const AuthProvider = ({ children }) => {

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [curUser, setCurUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setIsLoading(true);

      try {
        if (firebaseUser) {
          const userData = await getCurrentUser(firebaseUser);

          if (userData) {
            setCurUser(userData);
            setIsAuthenticated(true);
          }
        } else {
          setCurUser(null);
          setIsAuthenticated(false);
        }
      } catch (e) {
        setCurUser(null);
        setIsAuthenticated(false);
        throw new Error(e);
      } finally {
        setIsLoading(false);
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
      

      if (!userCredential) return;

      const userData = {
        firstname,
        lastname,
        email,
        pfp: null,
        bio: "",
        createdAt: serverTimestamp(),
      };

      await setDoc(doc(db, "users", userCredential.user.uid), userData);

      setCurUser({ id: userCredential.user.uid, ...userData });
      return userData;
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

      const userDoc = await getDoc(doc(db, "users", userCredential.user.uid));

      setCurUser({ id: userCredential.user.uid, ...userDoc.data() });
      return userCredential;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AuthContext.Provider
      value={{ curUser, setCurUser, isAuthenticated, signUp, login, isLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };
