import { useState, useEffect } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase";

const fetchPatientDetails = async (userId) => {
  try {
    const usersRef = collection(db, "users");
    const userQuery = query(usersRef, where("userId", "==", userId));
    const userQuerySnapshot = await getDocs(userQuery);

    // Check if any documents exist in the snapshot
    if (userQuerySnapshot.docs.length > 0) {
      // Access the data of the first document and return it
      return userQuerySnapshot.docs[0].data();
    } else {
      // Return null if no documents are found
      return null;
    }
  } catch (error) {
    console.error("Error fetching patient details:", error);
    return null;
  }
};

const RequestCard = ({ requestData, handleAccept, handleReject }) => {
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);
  const [patientDetails, setPatientDetails] = useState(null); // State to hold patient details

  useEffect(() => {
    const fetchDetails = async () => {
      const details = await fetchPatientDetails(requestData.userId);
      setPatientDetails(details);
    };

    fetchDetails();
  }, [requestData.userId]);

  const toggleAccordion = () => {
    setIsAccordionOpen((prevState) => !prevState);
  };

  return (
    <div className="card bg-base-100 shadow-xl p-5">
      <div className="card-header flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h3>{patientDetails ? `${patientDetails.firstName} ${patientDetails.lastName}` : "Loading..."}</h3>
        </div>
        <button
          className="btn btn-ghost"
          onClick={toggleAccordion}
          aria-expanded={isAccordionOpen}
        >
          {isAccordionOpen ? "Hide Details" : "View Details"}
        </button>
      </div>
      {isAccordionOpen && (
        <div className="card-body">
          <p>Email Address: {patientDetails?.email}</p>
          <p>Gender: {patientDetails?.gender}</p>
          <p>Health Card Number: {patientDetails?.healthCardNumber}</p>
          <p>Date of Birth: {patientDetails?.dob}</p>
          <p>Height: {patientDetails?.height} CM</p>
          <p>Weight: {patientDetails?.weight} KG</p>
          <div className="text-white flex gap-2 mt-5">
            <button className="btn btn-primary" onClick={handleAccept}>
              Accept
            </button>
            <button className="btn btn-error" onClick={handleReject}>
              Reject
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RequestCard;
