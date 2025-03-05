import { doc, getDoc } from "firebase/firestore";
import { db } from "../config/firebase";

export const getCurrentUser = async (firebaseUser) => {
  try {
    const userDoc = await getDoc(doc(db, "users", firebaseUser.uid));

    if (!userDoc) {
      throw new Error("User not found");
    }

    return {
      id: firebaseUser.uid,
      ...userDoc.data(),
    };
  } catch (error) {
    console.error(error);
  }
};
