import { useEffect, useState } from "react";
import PrescriptionCard from "../components/PrescriptionCard";
import { UserAuth } from "../contexts/AuthContext";
import { collection, query, where, getDocs } from "firebase/firestore";

const MedicalHistory = () => {
  const { db } = UserAuth();
  const userData = JSON.parse(localStorage.getItem("user"));
  const userId = userData.uid;
  const [prescriptions, setPrescriptions] = useState([]);

  useEffect(() => {
    const fetchPrescriptions = async () => {
      try {
        const prescriptionsRef = collection(db, "prescriptions");
        const q = query(
          prescriptionsRef,
          where("appointment.userId", "==", userId)
        );
        const querySnapshot = await getDocs(q);

        const prescriptionsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        console.log(userId);
        console.log(JSON.stringify(prescriptionsData));
        setPrescriptions(prescriptionsData);
      } catch (error) {
        console.error("Error fetching prescriptions:", error);
      }
    };

    fetchPrescriptions();
  }, [db, userId]);

  return (
    <div className="max-h-[80vh] ">
      <h1 className="app-header">Medical History and Prescriptions</h1>
      <div className="flex flex-col max-h-[80vh] overflow-y-scroll  gap-3 w-full p-1 py-4">
        {prescriptions.map((prescription, index) => (
          <PrescriptionCard key={index} prescription={prescription} />
        ))}
      </div>
    </div>
  );
};

export default MedicalHistory;
