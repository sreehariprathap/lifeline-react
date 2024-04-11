/* eslint-disable react/no-unescaped-entities */
import { useEffect, useState } from "react";
import DateBar from "../components/DateBar";
import { collection, query, where, getDocs } from "firebase/firestore";
import { UserAuth } from "../contexts/AuthContext";
import AppointmentCard from "../components/AppointmentCard";

const DoctorsAppointments = () => {
  const [days, setDays] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const { db } = UserAuth();
  const doctor = JSON.parse(localStorage.getItem("doctor"));

  useEffect(() => {
    const generateDays = () => {
      const currentDate = new Date(); // Get today's date
      const next14Days = Array.from({ length: 14 }, (_, index) => {
        const date = new Date();
        date.setDate(currentDate.getDate() + index); // Increment date by index
        const dayOfWeek = date.toLocaleDateString("en-US", { weekday: "long" });
        const formattedDate = date.toISOString().split("T")[0]; // Format date as "YYYY-MM-DD"
        return { day: dayOfWeek, date: formattedDate };
      });
      setDays(next14Days);
    };
    generateDays();
  }, []); // Empty dependency array ensures this effect runs only once on component mount

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
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.data());
      });

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
      <DateBar days={days} getAppointmentsByDate={getAppointmentsByDate} />
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
