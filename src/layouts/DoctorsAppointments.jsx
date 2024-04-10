import { useEffect, useState } from "react";
import DateBar from "../components/DateBar";
import { collection, query, where, getDocs } from "firebase/firestore";
import { UserAuth } from "../contexts/AuthContext";
import AppointmentCard from "../components/AppointmentCard";

// const user = JSON.parse(localStorage.getItem("user")).user;

const DoctorsAppointments = () => {
  const [days, setDays] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const { db } = UserAuth();
  const user = JSON.parse(localStorage.getItem("user")).user;

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
      const usersRef = collection(db, "users");

      // Query for appointments
      const q = query(
        appointmentsRef,
        where("date", "==", date),
        where("doctorId", "==", "diHDXrbRlpGjauw1Tqzz") //user.uid
      );

      // Fetch query snapshots
      const [appointmentsSnapshot] = await Promise.all([getDocs(q)]);

      // Fetch user data for each appointment
      const appointmentsData = await Promise.all(
        appointmentsSnapshot.docs.map(async (doc) => {
          const appointmentData = doc.data();

          // Get the userId from the appointment
          const userId = appointmentData.userId;

          // Query for the user document based on the userId
          const userQuery = query(usersRef, where("userId", "==", userId));
          const userSnapshot = await getDocs(userQuery);

          // Check if userSnapshot contains any documents
          if (userSnapshot.empty) {
            // Handle the case where no user document is found
            console.error("No user document found for userId:", userId);
            return { ...appointmentData, user: null, id: doc.id };
          } else {
            // Extract user data from the user document
            const userData = userSnapshot.docs[0].data();
            return { ...appointmentData, user: userData, id: doc.id };
          }
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
      <DateBar days={days} getAppointmentsByDate={getAppointmentsByDate} />
      <div>
        {appointments.length !== 0 &&
          appointments.map((appointment, index) => (
            <AppointmentCard
              key={index}
              appointment={appointment}
              isDoctor={true}
            />
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

export default DoctorsAppointments;
