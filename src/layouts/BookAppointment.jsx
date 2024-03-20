import { useState } from "react";
import { DatePicker } from "antd";
import StepsSection from "../components/StepsSection";
import AvailabilityMapper from "../components/AvailabilityMapper";
import AdditionalInfoForm from "../components/AdditionalInfoForm";

const BookAppointment = () => {
  const [stage, setStage] = useState(0);
  const [step, setStep] = useState(0);
  const [isSubmit, setIsSubmit] = useState(false);
  const [doctorName, setDoctorName] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState("");
  const [additionalInfo, setAdditionalInfo] = useState("");
  const [modifiedAvailability, setModifiedAvailability] = useState("");

  const handleProceed = () => {
    setStage(stage + 1);
    setStep(step + 1);
  };

  const createAppointment = () => {
    const appointment = {
      doctor: doctorName,
      date: selectedDate,
      slot: selectedSlot,
      additionalInfo: additionalInfo,
      modifiedAvailability: modifiedAvailability
    };
    console.log(appointment);
    setIsSubmit(true);
  };

  return isSubmit ? (
    <div className="flex flex-col gap-2 w-full h-[80vh] items-center justify-start px-10 py-5 bg-slate-50 rounded-md shadow-md mx-5">
      <h1>Booking success</h1>
      <img
        src="https://static.vecteezy.com/system/resources/thumbnails/011/858/556/small_2x/green-check-mark-icon-with-circle-tick-box-check-list-circle-frame-checkbox-symbol-sign-png.png"
        alt=""
        className="w-44 "
      />
      {/* Display appointment details if needed */}
    </div>
  ) : (
    <div className="flex flex-col gap-2 w-full h-[80vh] items-stretch justify-between px-10 py-5 bg-slate-50 rounded-md shadow-md mx-5">
      <div className="flex justify-center">
        {stage === 0 && (
          <SelectDoctorComponent
            setDoctorName={setDoctorName}
            proceed={handleProceed}
          />
        )}
        {stage === 1 && (
          <DatePicker
            onChange={(date) => {
              setSelectedDate(date);
              handleProceed();
            }}
          />
        )}
        {stage === 2 && (
          <AvailabilityMapper
          availabilityString={"AABABNNAA"}
            onSlotSelect={(modifiedAvailabilityString,  { startTime, endTime }) => {
              setSelectedSlot(`${startTime}-${endTime}}`);
              setModifiedAvailability(modifiedAvailabilityString);
              handleProceed();
            }}
          />
        )}
        {stage === 3 && (
          <AdditionalInfoForm
            setAdditionalInfo={setAdditionalInfo}
            createAppointment={createAppointment}
          />
        )}
      </div>
      <div>
        <StepsSection step={step} />
      </div>
    </div>
  );
};

const SelectDoctorComponent = ({ setDoctorName, proceed }) => {
  const handleSelectDoctor = (e) => {
    setDoctorName(e.target.value);
  };

  return (
    <div className="flex flex-col gap-3">
      <h1>Select doctor to book an appointment</h1>
      <select
        placeholder="Select option"
        className="select input input-bordered"
        onChange={handleSelectDoctor}
      >
        <option value="Doctor 1">Doctor 1</option>
        <option value="Doctor 2">Doctor 2</option>
        <option value="Doctor 3">Doctor 3</option>
      </select>
      <button className="btn btn-primary" onClick={proceed}>
        Proceed
      </button>
    </div>
  );
};

export default BookAppointment;
