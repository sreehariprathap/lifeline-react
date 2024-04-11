import AppIcon from "../components/AppIcon";
import { FiPlusCircle } from "react-icons/fi";
import ProfileCard from "../components/ProfileCard";
import { Link } from "react-router-dom";
import {
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { UserAuth } from "../contexts/AuthContext";
import Loader from "../components/Loader";

const DoctorList = () => {
  const { db } = UserAuth();
  const userData = JSON.parse(localStorage.getItem("user"));
  const userId = userData.uid;

  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAcceptedDoctors = async () => {
      try {
        const requestsRef = collection(db, "requests");
        const q = query(
          requestsRef,
          where("userId", "==", userId),
          where("isAccepted", "==", true)
        );
        const querySnapshot = await getDocs(q);

        const doctorIds = new Set();
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          console.log(data);
          doctorIds.add(data.doctorId);
        });

        const doctorData = await Promise.all(
          Array.from(doctorIds).map(async (doctorId) => {
            const doctorsRef = collection(db, "doctors");
            const q = query(doctorsRef, where("userId", "==", doctorId));
            const querySnapshot = await getDocs(q);

            const doctorData = querySnapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }));

            return { id: doctorData.id, ...doctorData[0] };
          })
        );

        console.log(doctorData);
        setDoctors(doctorData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching accepted doctors:", error);
        setLoading(false);
        // setError("Failed to fetch accepted doctors. Please try again later.");
      }
    };

    fetchAcceptedDoctors();
  }, [userId]);

  return (
    <div className="flex flex-col gap-3">
      <div className="w-full flex justify-between items-center">
        <h1 className="app-header ">My Doctors</h1>
        <Link to={"/doctors/add"}>
          <AppIcon styles={""}>
            {
              <FiPlusCircle className="w-8 h-8 hover:text-primary-color transition linear" />
            }
          </AppIcon>
        </Link>
      </div>
      {loading ? (
        <Loader />
      ) : (
        <div className=" flex flex-wrap gap-2">
          {doctors.length === 0 ? (
            <p>No doctors found. Please add a doctor to continue.</p>
          ) : (
            doctors.map((doctor, index) => (
              <ProfileCard key={index} doctor={doctor} isListing={true} />
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default DoctorList;
