import { useState } from "react";
import { DatePicker } from "antd";
import StepsSection from "../components/StepsSection";
import AvailabilityMapper from "../components/AvailabilityMapper";
import AdditionalInfoForm from "../components/AdditionalInfoForm";
import LottieControl from "../components/LottieControl";
import calander from "/public/images/calander.json";
import SelectDoctorComponent from "../components/SelectDoctorComponent";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { addDoc, collection } from "firebase/firestore";
import { UserAuth } from "../contexts/AuthContext";
dayjs.extend(customParseFormat);

const BookAppointment = () => {
  const { db } = UserAuth();
  const [stage, setStage] = useState(0);
  const [step, setStep] = useState(0);
  const [isSubmit, setIsSubmit] = useState(false);
  const [doctorName, setDoctorName] = useState("");
  const [doctorId, setDoctorId] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedSlot, setSelectedSlot] = useState("");
  const [modifiedAvailability, setModifiedAvailability] = useState("");

  // eslint-disable-next-line arrow-body-style
  const disabledDate = (current) => {
    const today = dayjs();
    const futureLimit = today.add(14, "day").endOf("day");
    return current && (current < today || current > futureLimit);
  };

  const handleProceed = () => {
    setStage(stage + 1);
    setStep(step + 1);
  };

  const setDate = (date) => {
    setSelectedDate(date);
    handleProceed();
  };

  const handleDoctorNameAndId = (doctorName, doctorId) => {
    console.log(doctorName, doctorId);
    setDoctorName(doctorName);
    setDoctorId(doctorId);
  };

  const createAppointment = async (additionalInfo) => {
    try {
      const appointment = {
        doctor: doctorName,
        doctorId: doctorId,
        date: selectedDate,
        slot: selectedSlot,
        additionalInfo: additionalInfo,
        modifiedAvailability: modifiedAvailability,
        userId: JSON.parse(localStorage.getItem("user")).user.uid,
      };

      // Add appointment to Firestore appointments collection
      const appointmentsRef = collection(db, "appointments");
      await addDoc(appointmentsRef, appointment);

      // Update state to indicate submission
      setIsSubmit(true);
    } catch (error) {
      console.error("Error creating appointment:", error);
      // Handle error as needed
    }
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
            setDoctorNameAndId={handleDoctorNameAndId} // Pass the handleDoctorNameAndId function
            proceed={handleProceed}
          />
        )}
        {stage === 1 && (
          <DatePicker
            format="YYYY-MM-DD"
            disabledDate={disabledDate}
            onChange={(date) => setDate(date.format("YYYY-MM-DD"))}
          />
        )}
        {stage === 2 && (
          <AvailabilityMapper
            availabilityString={"AABABNNAA"}
            onSlotSelect={(
              modifiedAvailabilityString,
              { startTime, endTime }
            ) => {
              setSelectedSlot(`${startTime}-${endTime}`);
              setModifiedAvailability(modifiedAvailabilityString);
              handleProceed();
            }}
          />
        )}
        {stage === 3 && (
          <AdditionalInfoForm createAppointment={createAppointment} />
        )}
      </div>
      <div>
        <StepsSection step={step} />
      </div>
    </div>
  );
};

export default BookAppointment;
