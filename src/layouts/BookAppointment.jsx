import { useState } from "react";
import { DatePicker } from "antd";
import StepsSection from "../components/StepsSection";
import AvailabilityMapper from "../components/AvailabilityMapper";
import AdditionalInfoForm from "../components/AdditionalInfoForm";
import LottieControl from "../components/LottieControl";
import calander from "/src/assets/calander.json";
import SelectDoctorComponent from "../components/SelectDoctorComponent";
import dayjs from "dayjs";

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
      modifiedAvailability: modifiedAvailability,
    };
    console.log(appointment);
    setIsSubmit(true);
  };

  // Calculate the minimum date (next day)
  const minDate = new Date();
  minDate.setDate(minDate.getDate() + 1);

  // Calculate the maximum date (two weeks from today)
  const maxDate = new Date();
  maxDate.setDate(maxDate.getDate() + 14);

  return isSubmit ? (
    <div className="flex flex-col gap-2 w-full h-[80vh] items-center justify-center px-10 py-5 bg-white rounded-md shadow-md mx-5 py-10">
      <h1 className="text-3xl font-light ">Booking success</h1>
      <LottieControl animationData={calander} />
    </div>
  ) : (
    <div className="flex flex-col gap-2 w-full h-[80vh] items-stretch justify-between px-10 py-5 bg-white rounded-md shadow-md mx-5">
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
            minDate={dayjs(minDate, "YYYY-MM-DD")}
            maxDate={dayjs(maxDate, "YYYY-MM-DD")}
          />
        )}
        {stage === 2 && (
          <AvailabilityMapper
            availabilityString={"AABABNNAA"}
            onSlotSelect={(
              modifiedAvailabilityString,
              { startTime, endTime }
            ) => {
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

export default BookAppointment;
