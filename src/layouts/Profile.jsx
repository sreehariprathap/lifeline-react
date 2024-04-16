import { useState, useEffect } from "react";
import { UserAuth } from "../contexts/AuthContext";
import { collection, getDocs, query, where } from "firebase/firestore";

const Profile = ({ isDoctor = false }) => {
  const { user, db } = UserAuth();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!user) return; // Check if user object is null

      if (isDoctor) {
        setUserData(JSON.parse(localStorage.getItem("doctor")));
      } else {
        try {
          const userDataValue = JSON.parse(localStorage.getItem("user"));
          const appointmentsRef = collection(db, "users");
          const q = query(
            appointmentsRef,
            where("userId", "==", userDataValue.uid)
          );
          const querySnapshot = await getDocs(q);
          const userDataDoc = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setUserData(userDataDoc[0]);
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };

    fetchData();
  }, [isDoctor, user, db]);

  return (
    <div className="p-10 flex flex-col gap-3">
      <h1 className="text-5xl font-thin mb-5">
        Hello,{" "}
        {userData ? userData.firstName + " " + userData.lastName : "User"}
      </h1>
      <div className="flex items-center gap-5">
        <div className="w-52 rounded-full ring ring-primary-color ring-offset-base-100 ring-offset-2">
          <img
            className="w-52 rounded-full"
            src={
              !isDoctor
                ? user && user.photoURL // Check if user object is not null
                  ? user.photoURL
                  : "/images/icon1.png"
                : "/images/icon1.png"
            }
            alt="User Avatar"
          />
        </div>
        <div className="ml-5">
          <div>
            <h2 className="text-xl font-bold">Details</h2>
            <p>Email: {userData && userData.email}</p>
            {isDoctor ? (
              <>
                <p>Office Location: {userData && userData.officeLocation}</p>
                <p>Phone: {userData && userData.phone}</p>
                <p>Registration Number: {userData && userData.registrationNumber}</p>
                <p>Specialization: {userData && userData.specialization}</p>
              </>
            ) : (
              <>
                <p>Date of Birth: {userData && userData.dob}</p>
                <p>Gender: {userData && userData.gender}</p>
                <p>Height: {userData && userData.height}</p>
                <p>Weight: {userData && userData.weight}</p>
                <p>Health Card Number: {userData && userData.healthCardNumber}</p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
