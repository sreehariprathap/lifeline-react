import { useContext, createContext, useState, useEffect } from "react";
import {
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  getAuth,
} from "firebase/auth";
import { auth } from "../firebase";
import { db } from "../firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import toast from "react-hot-toast";

const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const googleSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider);
  };

  const loginWithEmailAndPassword = (email, password) => {
    const provider = new GoogleAuthProvider();
    signInWithEmailAndPassword(provider, email, password);
  };

  const RegisterWithEmailAndPassword = (userData) => {
    const { email, password } = userData;
    const provider = getAuth();
    createUserWithEmailAndPassword(provider, email, password)
      .then((userCredential) => {
        console.log("User credential", userCredential);
        userData.userId = userCredential.user.uid;
        addUserToDatabase(userData);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };

  const logOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Logout error:", error); // Log any errors that occur during logout
      toast.error("Failed to log out"); // Display an error message to the user
    }
  };

  const addUserToDatabase = async (userData) => {
    const {
      userId,
      firstName,
      lastName,
      email,
      password,
      dob,
      gender,
      height,
      weight,
      healthCardNumber,
    } = userData;

    try {
      // Add the user data to the 'users' collection
      await addDoc(collection(db, "users"), {
        userId: userId,
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
        dob: dob,
        gender: gender,
        height: height,
        weight: weight,
        healthCardNumber: healthCardNumber,
        createdAt: Timestamp.now(), // Assuming you want to track when the user was added
      });

      console.log("User added successfully to the database");
    } catch (error) {
      console.error("Error adding user to database:", error.message);
      // Handle error accordingly, e.g., show an alert or log it
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, [user]);

  return (
    <AuthContext.Provider
      value={{
        user,
        googleSignIn,
        logOut,
        loginWithEmailAndPassword,
        RegisterWithEmailAndPassword,
        addUserToDatabase,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(AuthContext);
};
