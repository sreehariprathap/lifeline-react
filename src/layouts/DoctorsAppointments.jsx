/* eslint-disable react/no-unescaped-entities */
import { useState } from "react";
import DateBar from "../components/DateBar";
import { collection, query, where, getDocs } from "firebase/firestore";
import { UserAuth } from "../contexts/AuthContext";
import AppointmentCard from "../components/AppointmentCard";

const DoctorsAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const { db } = UserAuth();
  const doctor = JSON.parse(localStorage.getItem("doctor"));

  const getAppointmentsByDate = async (date) => {
    try {
      const appointmentsRef = collection(db, "appointments");

      // Query for appointments
      const q = query(
        appointmentsRef,
        where("date", "==", date),
        where(
          "doctorId",
          "==",
          JSON.parse(localStorage.getItem("doctor")).userId
        )
      );

      // Fetch query snapshots
      const appointmentsSnapshot = await getDocs(q);

      // Fetch user data for each appointment
      const appointmentsData = await Promise.all(
        appointmentsSnapshot.docs.map(async (doc) => {
          const appointmentData = doc.data();

          // Query for the user document based on the userId
          const userQuery = query(
            collection(db, "users"),
            where("userId", "==", appointmentData.userId)
          );
          const userSnapshot = await getDocs(userQuery);
          const userData = userSnapshot.docs.map((doc) => doc.data())[0];

          return { ...appointmentData, user: userData, id: doc.id };
        })
      );

      setAppointments(appointmentsData);
    } catch (error) {
      console.error("Error fetching appointments:", error);
    }
  };

  return (
    <div className="">
      <h1 className="app-header capitalize">
        Hello, {doctor.firstName} {doctor.lastName}
      </h1>
      <DateBar getAppointmentsByDate={getAppointmentsByDate} />
      <div>
        {appointments.length !== 0 &&
          appointments.map(
            (appointment) => (
              <AppointmentCard
                key={appointment.id}
                appointment={appointment}
                isDoctor={true}
              />
            )
            // JSON.stringify(appointment)
          )}
      </div>
      {!appointments.length && (
        <div className="bg-white w-full rounded-md shadow-md p-5">
          <h1 className="text-4xl font-normal text-primary-color">
            You don't have any appointments for today
          </h1>
        </div>
      )}
    </div>
  );
};

export default DoctorsAppointments;
