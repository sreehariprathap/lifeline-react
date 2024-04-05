import { useEffect, useState } from "react";
import DateBar from "../components/DateBar";
import { collection, query, where, getDocs } from "firebase/firestore";
import { UserAuth } from "../contexts/AuthContext";

const Appointments = () => {
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
      // const userId = JSON.parse(localStorage.getItem("user")).user.uid;
      const appointmentsRef = collection(db, "appointments");
      const q = query(
        appointmentsRef,
        where("date", "==", date),
        where("userId", "==", user.uid)
      );
      const querySnapshot = await getDocs(q);
      const appointmentsData = querySnapshot.docs.map((doc) => doc.data());
      console.log("Appointments", appointmentsData);
      setAppointments(appointmentsData);
    } catch (error) {
      console.error("Error fetching appointments:", error);
    }
  };

  return (
    <div className="">
      <h1 className="app-header capitalize">Hello, {user.displayName}</h1>
      <DateBar days={days} getAppointmentsByDate={getAppointmentsByDate} />
      <div className="bg-white  w-full rounded-md shadow-md p-5">
        {appointments.length !== 0 && <div>{JSON.stringify(appointments)}</div>}
        {!appointments.length && (
          <h1 className="text-4xl font-normal text-primary-color">
            You dont have any appointments for today
          </h1>
        )}
      </div>
    </div>
  );
};

export default Appointments;
