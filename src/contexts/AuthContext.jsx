import { useContext, createContext, useState, useEffect } from "react";
import {
  signInWithPopup,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  getAuth,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { db } from "../firebase";
import { auth } from "../firebase";
import {
  collection,
  addDoc,
  Timestamp,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import toast from "react-hot-toast";
import useLocalStorage from "../hooks/useLocalStorage";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  // eslint-disable-next-line no-unused-vars
  const [userData, setUserData] = useLocalStorage("user", null);
  // eslint-disable-next-line no-unused-vars
  const [doctorData, setDoctorData] = useLocalStorage("doctor", null);
  const navigate = useNavigate();

  const googleSignIn = () => {
    const provider = new GoogleAuthProvider();
    const auth = getAuth(); // Get the auth instance
    signInWithPopup(auth, provider)
      .then((userCredential) => {
        setUserData(userCredential.user);
        setUser(userCredential.user); // Set user directly from userCredential.user
        navigate("/appointments");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error(errorCode, errorMessage);
      });
  };

  const loginWithEmailAndPassword = (email, password, isDoctor = false) => {
    if (!isDoctor) {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          setUser(userCredential.user);
          setUserData(userCredential.user);
          navigate("/appointments");
        })
        .catch((error) => {
          console.error("Email and password sign-in error:", error);
          toast.error("Failed to sign in with email and password");
        });
    } else {
      signInWithEmailAndPassword(auth, email, password)
        .then((doctorCredential) => {
          setUser(doctorCredential.user);
          // Fetch doctor's data from Firestore
          const doctorsRef = collection(db, "doctors");
          const doctorQuery = query(
            doctorsRef,
            where("userId", "==", doctorCredential.user.uid)
          );
          getDocs(doctorQuery)
            .then((querySnapshot) => {
              if (querySnapshot.empty) { // Check if the query snapshot is empty
                toast.error("Doctor data not found. Logging out.");
                logOut(true); // Logout the user if doctor data is not found
                return;
              }
              querySnapshot.forEach((doc) => {
                const doctorData = doc.data();
                setDoctorData(doctorData);
              });
              navigate("/doctor/appointments");
            })
            .catch((error) => {
              console.error("Error getting doctor's data:", error);
              toast.error("Failed to fetch doctor's data");
            });
        })
        .catch((error) => {
          console.error("Email and password sign-in error for doctor:", error);
          toast.error("Failed to sign in with email and password");
        });
    }
  };
   

  const RegisterWithEmailAndPassword = (userData, isDoctor = false) => {
    const { email, password } = userData;
    const auth = getAuth(); // Get the auth instance
    if (isDoctor) {
      createUserWithEmailAndPassword(auth, email, password)
        .then((doctorCredential) => {
          setUser(doctorCredential.user); // Set user directly from doctorCredential.user
          navigate("/doctor/appointments");
          addDoctorToDatabase(doctorCredential.user.uid, userData); // Pass UID and userData to addDoctorToDatabase
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.error(errorCode, errorMessage);
        });
    } else {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          setUser(userCredential.user); // Set user directly from userCredential.user
          navigate("/appointments");
          addUserToDatabase(userCredential.user.uid, userData); // Pass UID and userData to addUserToDatabase
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.error(errorCode, errorMessage);
        });
    }
  };

  const logOut = async (isDoctor = false) => {
    const auth = getAuth(); // Get the auth instance
    try {
      await signOut(auth);
      setUser(null); // Set user to null after logout
      isDoctor
        ? localStorage.removeItem("doctor")
        : localStorage.removeItem("user");
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Failed to log out");
    }
  };

  const addDoctorToDatabase = async (uid, doctorData) => {
    try {
      await addDoc(collection(db, "doctors"), {
        userId: uid, // Use the passed UID
        ...doctorData, // Spread the doctorData
        createdAt: Timestamp.now(),
      });
      console.log("Doctor added successfully to the database");
    } catch (error) {
      console.error("Error adding doctor to database:", error.message);
    }
  };

  const addUserToDatabase = async (uid, userData) => {
    try {
      await addDoc(collection(db, "users"), {
        userId: uid, // Use the passed UID
        ...userData, // Spread the userData
        createdAt: Timestamp.now(),
      });
      console.log("User added successfully to the database");
    } catch (error) {
      console.error("Error adding user to database:", error.message);
    }
  };

  useEffect(() => {
    const auth = getAuth(); // Get the auth instance
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser); // Set user directly from currentUser
    });
    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        googleSignIn,
        logOut,
        loginWithEmailAndPassword,
        RegisterWithEmailAndPassword,
        addUserToDatabase,
        db,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(AuthContext);
};
