import { useState } from "react";

const AdditionalInfoForm = ({ createAppointment }) => {
  const [additionalInfo, setAdditionalInfo] = useState("");

  const handleInputChange = (e) => {
    // Extract the value from the textarea
    const inputValue = e.target.value;
    setAdditionalInfo(inputValue);
  };

  const handleSubmit = () => {
    console.log("additional info", additionalInfo);
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
