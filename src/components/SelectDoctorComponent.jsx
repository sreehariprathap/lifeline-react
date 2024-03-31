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
  setDoctorNameAndId,
  proceed,
  userId = "BcpxRzODsEbdkjo1vrcrftwu3L23",
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
          doctorIds.add(data.doctorId);
        });

        const doctorData = await Promise.all(
          Array.from(doctorIds).map(async (doctorId) => {
            const doctorDoc = await getDoc(document(db, "doctors", doctorId));
            return { id: doctorDoc.id, ...doctorDoc.data() };
          })
        );

        setDoctors(doctorData);
        setDoctorNameAndId(
          doctorData[0].firstName + " " + doctorData[0].lastName,
          doctorData[0].id
        );
      } catch (error) {
        console.error("Error fetching accepted doctors:", error);
      }
    };

    fetchAcceptedDoctors();
  }, [userId]);

  const handleSelectDoctor = (e) => {
    const selectedDoctor = doctors.find(
      (doctor) => doctor.id === e.target.value
    );
    setDoctorNameAndId(
      selectedDoctor.firstName + " " + selectedDoctor.lastName,
      selectedDoctor.id
    ); // Pass both name and ID
  };

  return (
    <div className="flex flex-col gap-3">
      <h1>Select doctor to book an appointment</h1>
      <select
        placeholder="Select option"
        className="select input input-bordered"
        onChange={handleSelectDoctor}
        onSelect={handleSelectDoctor}
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
