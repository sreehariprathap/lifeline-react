import { useEffect, useState } from "react";
import { UserAuth } from "../contexts/AuthContext";
import {
  collection,
  getDocs,
  query,
  where,
  doc as document,
  getDoc,
} from "firebase/firestore";

const SelectDoctorComponent = ({
  setDoctorName,
  proceed,
  userId = "eoNQGeX4y3d4kYjbra7ot147IRA2",
}) => {
  const { db } = UserAuth();
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

  const handleSelectDoctor = (e) => {
    setDoctorName(e.target.value);
  };

  return (
    <div className="flex flex-col gap-3">
      <h1>Select doctor to book an appointment</h1>
      <select
        placeholder="Select option"
        className="select input input-bordered"
        onChange={handleSelectDoctor}
      >
        {doctors.map((doctor) => (
          <option key={doctor.id} value={doctor.id}>
            {doctor.firstName} {doctor.lastName} - {doctor.specialization}
          </option>
        ))}
      </select>
      <button className="btn btn-primary" onClick={proceed}>
        Proceed
      </button>
    </div>
  );
};

export default SelectDoctorComponent;
