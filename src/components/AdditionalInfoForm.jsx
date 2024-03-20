import { useState } from "react";

const AdditionalInfoForm = ({ createAppointment }) => {
  const [additionalInfo, setAdditionalInfo] = useState("");

  const handleInputChange = (e) => {
    setAdditionalInfo(e.target.value);
  };

  const handleSubmit = () => {
    // Call the callback function from the parent component and pass the additional info
    createAppointment(additionalInfo);
  };

  return (
    <div>
      <h2>Additional Information</h2>
      <div>
        <label htmlFor="additionalInfo">
          Add any additional information you want to enter:
        </label>
        <textarea
          id="additionalInfo"
          value={additionalInfo}
          onChange={handleInputChange}
          rows={4}
          cols={50}
        />
      </div>
      <button className="btn btn-primary" onClick={handleSubmit}>
        Create Appointment
      </button>
    </div>
  );
};

export default AdditionalInfoForm;
