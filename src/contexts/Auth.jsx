// import { useState, createContext, useEffect, useContext } from "react";
// import { auth, db } from "../config/firebase";
// import {
//   createUserWithEmailAndPassword,
//   onAuthStateChanged,
//   signInWithEmailAndPassword,
// } from "firebase/auth";
// import { doc, serverTimestamp, setDoc } from "firebase/firestore";

// const AuthContext = createContext({ user: null, isLoading: true });

// const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);

//   const clear = () => {
//     setUser(null);
//     setIsLoading(false);
//   };

//   const authStateChanged = async (user) => {
//     setIsLoading(true);

//     if (!user) {
//       clear();
//       return;
//     }
//     setUser({
//       firstname: user.firstname,
//       uid: user.uid,
//       email: user.email,
//     });

//     setIsLoading(false);
//   };

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, authStateChanged);

//     return () => unsubscribe;
//   }, []);

//   const signUp = async (firstname, lastname, email, password) => {
//     try {
//       const res = await createUserWithEmailAndPassword(auth, email, password);
//       const user = res.user;

//       const data = await setDoc(doc(db, "users", user.uid), {
//         firstname: firstname, // Store actual user input
//         lastname: lastname,
//         email: email,
//         pfp: "",
//         about: "",
//         createdAt: serverTimestamp(),
//       });
//       console.log(data);
//       await setDoc(doc(db, "chats", user.uid), {
//         chatData: [],
//       });

//       console.log(user);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const login = async (email, password) => {
//     try {
//       await signInWithEmailAndPassword(email, password);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   return (
//     <AuthContext.Provider value={{ user, signUp, login, isLoading }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// const useAuth = () => useContext(AuthContext);

// export { AuthProvider, useAuth };

import { useState, createContext, useEffect, useContext } from "react";
import { auth, db } from "../config/firebase";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { doc, serverTimestamp, setDoc, getDoc } from "firebase/firestore";

const AuthContext = createContext({ user: null, isLoading: true });

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const clear = () => {
    setUser(null);
    setIsLoading(false);
  };

  const authStateChanged = async (user) => {
    setIsLoading(true);

    if (!user) {
      clear();
      return;
    }

    const userDoc = await getDoc(doc(db, "users", user.uid));

    if (userDoc.exists()) {
      setUser({
        firstname: userDoc.data().firstname,
        lastname: userDoc.data().lastname,
        uid: user.uid,
        email: user.email,
      });
    }
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
    const unsubscribe = onAuthStateChanged(auth, authStateChanged);
    return () => unsubscribe();
  }, []);

  const signUp = async (firstname, lastname, email, password) => {
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      const user = res.user;

      await setDoc(doc(db, "users", user.uid), {
        firstname: firstname,
        lastname: lastname,
        email: email,
        pfp: "",
        about: "",
        createdAt: serverTimestamp(),
      });

   
      console.log(user);
    } catch (error) {
      console.error(error);
      // throw error;
    }
  };

  const login = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, signUp, login, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };
