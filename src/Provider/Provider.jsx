import { createContext, useEffect, useState } from "react";
import { auth } from "../firebase/firebase.init";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const ContextProvider = createContext();

const Provider = ({ children }) => {
  const [userAcount, setUserAcount] = useState(null);
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);

  const createUser = (email, password) =>
    createUserWithEmailAndPassword(auth, email, password);

  const provider = new GoogleAuthProvider();
  const signWithGoogle = () => signInWithPopup(auth, provider);

  const signInUser = (email, password) =>
    signInWithEmailAndPassword(auth, email, password);
  const signOutUser = () => {
    return signOut(auth);
  };

  const updateUser = (name, photo) =>
    updateProfile(auth.currentUser, { displayName: name, photoURL: photo });

  const resetPassword = (email) => sendPasswordResetEmail(auth, email);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUserAcount(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const notifySuccess = (message) => {
    toast.success(`${message}! 🎉`, {
      position: "top-center",
      autoClose: 2000, // Closes in 1 seconds
      theme: "dark",
    });
  };

  const notifyWarning = (message) => {
    toast.error(`${message}! ⚠️`, {
      position: "top-center",
      autoClose: 3000,
      theme: "dark",
    });
  };

  const notifyError = (message) => {
    toast.error(`${message}! ❌`, {
      position: "top-center",
      autoClose: 4000,
      theme: "dark",
    });
  };

  const authInfo = {
    userAcount,
    createUser,
    signInUser,
    signOutUser,
    updateUser,
    signWithGoogle,
    resetPassword,
    loading,

    notifySuccess,
    notifyError,
    notifyWarning,

    movies,
    setMovies,
  };

  return (
    <div>
      <ContextProvider.Provider value={authInfo}>
        <>
          {children}
          <ToastContainer />
        </>
      </ContextProvider.Provider>
    </div>
  );
};

export default Provider;
