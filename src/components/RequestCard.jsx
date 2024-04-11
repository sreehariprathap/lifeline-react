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
      console.log(userQuerySnapshot.docs[0].data());
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

  const fallbackImage =
    "https://cdn-icons-png.flaticon.com/512/9131/9131529.png"; // URL of the fallback image

  return (
    <div className="card w-88 bg-base-100 shadow-xl p-5">
      <div className="card-header flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <img
            src={patientDetails?.imageUrl || fallbackImage} // Use fallback image if user image is not available
            alt={patientDetails?.firstName}
            className="w-12 h-12 rounded-full"
          />
          <h3>
            {patientDetails?.firstName} {patientDetails?.lastName}
          </h3>
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
            <button className="btn btn-error text-white" onClick={handleReject}>
              Reject
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RequestCard;
