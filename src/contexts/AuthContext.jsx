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
import useLocalStorage from "../hooks/useLocalStorage";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

// navigate("/appointments");
// eslint-disable-next-line react/prop-types
export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useLocalStorage("user", null);
  const [doctorData, setDoctorData] = useLocalStorage("doctor", null);
  const navigate = useNavigate();

  const googleSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((userCredential) => {
        setUserData(userCredential);
        console.log(userData);
        navigate("/appointments");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };

  const loginWithEmailAndPassword = (email, password, isDoctor = false) => {
    const provider = new GoogleAuthProvider();
    if (!isDoctor) {
      signInWithEmailAndPassword(provider, email, password)
        .then((userCredential) => {
          setUserData(userCredential);
          console.log(doctorData);
          navigate("/appointments");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode, errorMessage);
        });
    } else {
      signInWithEmailAndPassword(provider, email, password)
        .then((doctorCredential) => {
          setDoctorData(doctorCredential);
          console.log(doctorData);
          navigate("/doctor/appointments");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode, errorMessage);
        });
    }
  };

  const RegisterWithEmailAndPassword = (userData, isDoctor = false) => {
    const { email, password } = userData;
    const provider = getAuth();
    if (isDoctor) {
      createUserWithEmailAndPassword(provider, email, password)
        .then((doctorCredential) => {
          console.log("Doctor credential", doctorCredential);
          userData.userId = doctorCredential.user.uid;
          setDoctorData(doctorCredential);
          navigate("doctor/appointments");

          console.log(doctorData);
          userData.availabilityString = "AAAAAAAAAAAAAAAA";
          userData.isVerified = true;
          addDoctorToDatabase(userData);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode, errorMessage);
        });
    } else {
      createUserWithEmailAndPassword(provider, email, password)
        .then((userCredential) => {
          console.log("User credential", userCredential);
          console.log(userData);

          setUserData(userCredential);
          userData.userId = userCredential.user.uid;
          addUserToDatabase(userData);
          navigate("/appointments");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode, errorMessage);
        });
    }
  };

  const logOut = async () => {
    try {
      await signOut(auth);
      setDoctorData(null);
      setUserData(null);
    } catch (error) {
      console.error("Logout error:", error); // Log any errors that occur during logout
      toast.error("Failed to log out"); // Display an error message to the user
    }
  };

  const addDoctorToDatabase = async (doctorData) => {
    const {
      userId,
      firstName,
      lastName,
      email,
      phone,
      officeLocation,
      registrationNumber,
      specialization,
      availabilityString,
    } = doctorData;

    try {
      // Add the doctor data to the 'doctors' collection
      await addDoc(collection(db, "doctors"), {
        userId: userId,
        firstName: firstName,
        lastName: lastName,
        email: email,
        phone: phone,
        officeLocation: officeLocation,
        registrationNumber: registrationNumber,
        specialization: specialization,
        availabilityString: availabilityString,
        createdAt: Timestamp.now(),
      });

      console.log("Doctor added successfully to the database");
    } catch (error) {
      console.error("Error adding doctor to database:", error.message);
      // Handle error accordingly, e.g., show an alert or log it
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
