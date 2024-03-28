import { useState } from "react";

const RequestCard = ({ requestData, handleAccept, handleReject }) => {
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);

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
            src={requestData.patientDetails.imageUrl || fallbackImage} // Use fallback image if user image is not available
            alt={requestData.patientDetails.firstName}
            className="w-12 h-12 rounded-full"
          />
          <h3>
            {requestData.patientDetails.firstName}{" "}
            {requestData.patientDetails.lastName}
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
          <p>Email Address: {requestData.patientDetails.email}</p>
          <p>Gender: {requestData.patientDetails.gender}</p>
          <p>
            Health Card Number: {requestData.patientDetails.healthCardNumber}
          </p>
          <p>Date of Birth: {requestData.patientDetails.dob}</p>
          <p>Height: {requestData.patientDetails.height} CM</p>
          <p>Weight: {requestData.patientDetails.weight} KG</p>
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
