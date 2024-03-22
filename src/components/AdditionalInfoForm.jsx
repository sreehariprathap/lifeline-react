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
      <div className="flx flex-col gap-2 w-full">
        <div className="label">
          <span className="label-text">
            Please enter any additional information
          </span>
        </div>
        <textarea
          id="additionalInfo"
          value={additionalInfo}
          onChange={handleInputChange}
          cols={50}
          className="input input-bordered"
        />
      </div>
      <button className="btn btn-primary" onClick={handleSubmit}>
        Create Appointment
      </button>
    </div>
  );
};

export default AdditionalInfoForm;
