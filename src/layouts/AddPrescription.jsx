import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { UserAuth } from "../contexts/AuthContext";
import Prescription from "../components/Prescription";
import Loader from "../components/Loader";

const AddPrescription = () => {
  const { db } = UserAuth();
  const { id } = useParams();
  const [appointment, setAppointment] = useState(null);
  const [prescriptionId, setPrescriptionId] = useState(null);

  // Function to calculate age from date of birth
  const calculateAge = (dob) => {
    const dobDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - dobDate.getFullYear();
    const monthDiff = today.getMonth() - dobDate.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < dobDate.getDate())
    ) {
      age--;
    }
    return age;
  };

  useEffect(() => {
    const fetchAppointment = async () => {
      try {
        const appointmentDoc = doc(db, "appointments", id);
        const appointmentSnapshot = await getDoc(appointmentDoc);

        if (!appointmentSnapshot.exists()) {
          console.error("Appointment document not found with ID:", id);
          return;
        }

        const appointmentData = appointmentSnapshot.data();
        const userId = appointmentData.userId;
        // const doctorId = "eoNQGeX4y3d4kYjbra7ot147IRA2";

        const appointmentsRef = collection(db, "users");
        const q = query(appointmentsRef, where("userId", "==", userId));
        const querySnapshot = await getDocs(q);

        // const docRef = collection(db, "doctors");
        // const p = query(docRef, where("userId", "==", doctorId));
        // const docQuerySnapshot = await getDocs(p);

        const userData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        // const doctorData = docQuerySnapshot.docs.map((doc) => ({
        //   id: doc.id,
        //   ...doc.data(),
        // }));

        const appointmentWithUser = {
          ...appointmentData,
          user: userData[0],
          doctor: JSON.parse(localStorage.getItem("doctor")),
        };
        console.log(JSON.stringify(appointmentWithUser));
        setAppointment(appointmentWithUser);
      } catch (error) {
        console.error("Error fetching appointment:", error);
      }
    };

    fetchAppointment();
  }, [id]);

  const createPrescription = async (prescription) => {
    try {
      const prescriptionData = { ...prescription, ...appointment };
      console.log(prescriptionData);
      // Add appointment to Firestore prescriptions collection
      const prescriptionRef = await addDoc(
        collection(db, "prescriptions"),
        prescriptionData
      );

      // Access the ID of the added document from the prescriptionRef
      const prescriptionId = prescriptionRef.id;

      // You can use the prescriptionId as needed
      console.log("Added prescription with ID:", prescriptionId);
      setPrescriptionId(prescriptionId);
    } catch (error) {
      console.error("Error creating prescription:", error);
      // Handle error as needed
    }
  };

  return (
    <div>
      {appointment ? (
        <div className="border rounded-md mb-4 p-4 bg-white px-10 py-5 overflow-y-scroll">
          <h1 className="text-3xl font-bold text-center">Prescription</h1>
          <div className=" ">
            <h3 className="text-xl font-semibold mb-2">Appointment Info</h3>
            <p>
              Appointment ID: {id} {"   "} <br />
              <span className="badge badge-primary">
                Date: {appointment.date}
              </span>{" "}
              <span className="badge badge-primary">
                Time Slot: {appointment.slot}
              </span>{" "}
            </p>

            <div className="flex justify-between">
              <div>
                <h3 className="text-xl font-semibold mt-4 mb-2">
                  Patient Info
                </h3>
                <p>
                  Name:{" "}
                  {appointment.user
                    ? `${appointment.user.firstName} ${appointment.user.lastName}`
                    : "Unknown"}
                </p>
                <p>
                  Email: {appointment.user ? appointment.user.email : "Unknown"}
                </p>
                <p>
                  Health card:{" "}
                  {appointment.user
                    ? appointment.user.healthCardNumber
                    : "Unknown"}
                </p>
                <p>
                  Gender:{" "}
                  {appointment.user ? appointment.user.gender : "Unknown"}
                </p>
                <p>
                  Age:{" "}
                  {appointment.user
                    ? calculateAge(appointment.user.dob)
                    : "Unknown"}
                </p>
                <p>
                  Height:{" "}
                  {appointment.user ? appointment.user.height : "Unknown"}
                </p>
                <p>
                  Weight:{" "}
                  {appointment.user ? appointment.user.weight : "Unknown"}
                </p>
                {/* Add more patient details as needed */}
              </div>
              {appointment.additionalInfo && (
                <div>
                  <h3 className="text-lg font-semibold mt-4 mb-2">
                    Additional Info
                  </h3>
                  <p>{appointment.additionalInfo}</p>
                </div>
              )}
            </div>
            <div className="divider"></div>
            <div>
              <Prescription completeAppointment={createPrescription} />
            </div>
            {prescriptionId && (
              <div>
                <a href={`/prescription/${prescriptionId}`} target="_blank">
                  <button
                    className={`btn btn-primary ${
                      prescriptionId !== undefined ? "" : ""
                    }`}
                  >
                    Print
                  </button>
                </a>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="w-full flex justify-center h-[300px]">
          <Loader />
        </div>
      )}
    </div>
  );
};

export default AddPrescription;
