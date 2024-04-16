import { useState } from "react";
import DateBar from "../components/DateBar";
import { collection, query, where, getDocs } from "firebase/firestore";
import { UserAuth } from "../contexts/AuthContext";
import AppointmentCard from "../components/AppointmentCard";

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const { db } = UserAuth();
  const user = JSON.parse(localStorage.getItem("user"));

  const getAppointmentsByDate = async (date) => {
    try {
      const appointmentsRef = collection(db, "appointments");
      const q = query(
        appointmentsRef,
        where("date", "==", date),
        where("userId", "==", user.uid)
      );
      const querySnapshot = await getDocs(q);

      const appointmentsData = await Promise.all(
        querySnapshot.docs.map(async (doc) => {
          const appointmentData = doc.data();
          const doctorQ = query(
            collection(db, "doctors"),
            where("userId", "==", appointmentData.doctorId)
          );
          const doctorSnapshot = await getDocs(doctorQ);
          const doctorData = doctorSnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          return { ...appointmentData, doctor: doctorData[0] };
        })
      );
      console.log(appointmentsData);
      setAppointments(appointmentsData);
    } catch (error) {
      console.error("Error fetching appointments:", error);
    }
  };

  return (
    <div className="">
      <h1 className="app-header capitalize">Hello, {user.displayName}</h1>
      <DateBar getAppointmentsByDate={getAppointmentsByDate} />
      <div>
        {appointments.length !== 0 &&
          appointments.map((appointment, index) => (
            <AppointmentCard key={index} appointment={appointment} />
          ))}
      </div>
      {!appointments.length && (
        <div className="bg-white  w-full rounded-md shadow-md p-5">
          <h1 className="text-4xl font-normal text-primary-color">
            You dont have any appointments for today
          </h1>
        </div>
      )}
    </div>
  );
};

export default Appointments;
