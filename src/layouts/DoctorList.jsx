import AppIcon from "../components/AppIcon";
import { FiPlusCircle } from "react-icons/fi";
import ProfileCard from "../components/ProfileCard";
import { Link } from "react-router-dom";
import {
  collection,
  getDocs,
  query,
  where,
  doc as document,
  getDoc,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { UserAuth } from "../contexts/AuthContext";


const DoctorList = () => {
  const { db } = UserAuth();
  const userData = JSON.parse(localStorage.getItem("user"));
  const userId = userData.user.uid;

  const [doctors, setDoctors] = useState([]);

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
            const doctorDoc = await getDoc(document(db, "doctors", doctorId));
            return { id: doctorDoc.id, ...doctorDoc.data() };
          })
        );

        console.log(doctorData);
        setDoctors(doctorData);
      } catch (error) {
        console.error("Error fetching accepted doctors:", error);
        // setError("Failed to fetch accepted doctors. Please try again later.");
        // setLoading(false);
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
      <div className=" flex flex-wrap gap-2">
        {doctors.map((doctor, index) => (
          <ProfileCard key={index} doctor={doctor} isListing={true} />
        ))}
      </div>
    </div>
  );
};

export default DoctorList;
