import React, { useState } from "react";

const BookAppointment = () => {
  const [stage, setStage] = useState(0);

  const handleProceedToDateSelect = () => {
    setStage(1);
  };

  return (
    <div className="flex flex-col gap-2 py-2">
      {stage === 0 && (
        <SelectDoctorComponent proceedToDateSelect={handleProceedToDateSelect} />
      )}
      {stage === 1 && <DatePickerComponent />}
      <progress
        className="progress progress-accent w-56"
        value="100"
        max="100"
      ></progress>
    </div>
  );
};

const SelectDoctorComponent = ({ proceedToDateSelect }) => {
  return (
    <div className="flex flex-col gap-3">
      <h1>Select doctor to book an appointment</h1>
      <select
        placeholder="Select option"
        className="select input input-bordered"
        onChange={proceedToDateSelect}
      >
        <option value="option1">Doctor 1</option>
        <option value="option2">Doctor 2</option>
        <option value="option3">Doctor 3</option>
      </select>
    </div>
  );
};

const DatePickerComponent = () => {
  return <h1>Hello</h1>;
};

export default BookAppointment;
