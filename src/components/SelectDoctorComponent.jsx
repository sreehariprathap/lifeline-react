import { useEffect, useState } from "react";
import { UserAuth } from "../contexts/AuthContext";
import { collection, getDocs, query, where } from "firebase/firestore";

const SelectDoctorComponent = ({
  setDoctorNameAndId,
  proceed,
  userId = JSON.parse(localStorage.getItem("user")).uid,
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
            const doctorsRef = collection(db, "doctors");
            const q = query(doctorsRef, where("userId", "==", doctorId));
            const querySnapshot = await getDocs(q);

            const doctorData = querySnapshot.docs.map((doc) => ({
              ...doc.data()
            }));

            return { id: doctorData.id, ...doctorData[0] };
          })
        );
        console.log(doctorData);
        setDoctors(doctorData);
      } catch (error) {
        console.error("Error fetching accepted doctors:", error);
      }
    };

    fetchAcceptedDoctors();
  }, [userId, db, setDoctorNameAndId]);

  const handleSelectDoctor = (e) => {
    const selectedDoctorId = e.target.value;
    const selectedDoctor = doctors.find(
      (doctor) => doctor.userId === selectedDoctorId
    );

    if (selectedDoctor) {
      setDoctorNameAndId(
        `${selectedDoctor.firstName} ${selectedDoctor.lastName}`,
        selectedDoctor.userId
      ); // Pass both name and ID
    }
  };

  return (
    <div className="flex flex-col gap-3">
      <h1>Select doctor to book an appointment</h1>
      {doctors.length ? (
        <>
          <select
            placeholder="Select option"
            className="select input input-bordered"
            onChange={handleSelectDoctor}
          >
            {doctors.map((doctor) => (
              <option key={doctor.userId} value={doctor.userId}>
                {doctor.firstName} {doctor.lastName} - {doctor.specialization}
              </option>
            ))}
          </select>
          <button className="btn btn-primary" onClick={proceed}>
            Proceed
          </button>
        </>
      ) : (
        <div>
          <h2>Please add a doctor to continue</h2>
        </div>
      )}
    </div>
  );
};

export default SelectDoctorComponent;
