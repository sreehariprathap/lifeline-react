import { useState } from "react";
import StepsSection from "./StepsSection";
import MedicalDiagnosisComponent from "./MedicalDiagnosisComponent";
import AllergiesComponent from "./AllergiesComponent";
import MedicinesComponent from "./MedicinesComponent";
import SpecialConsiderationsComponent from "./SpecialConsiderationsComponent";

const Prescription = ({ completeAppointment }) => {
  const [stage, setStage] = useState(0);
  const [step, setStep] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [prescription, setPrescription] = useState({});

  // Function to update prescription object with values from each component
  const updatePrescription = (values) => {
    setPrescription({ ...prescription, ...values });
  };

  const handleProceed = (values) => {
    updatePrescription(values); // Update prescription object with values from components
    setStage(stage + 1);
    setStep(step + 1);
  };

  const createPrescriptions = (values) => {
    updatePrescription(values); // Update prescription object with values from SpecialConsiderationsComponent
    setIsSubmitted(true);
    completeAppointment(prescription);
  };

  return isSubmitted ? (
    <div className="bg-white rounded-lg w-full flex flex-col justify-center items-start py-5 gap-3 ">
      <div className="w-full flex flex-col gap-2">
        <p>
          <strong>Diagnosis:</strong> {prescription.diagnosis}
        </p>
        <p>
          <strong>Detailed Diagnosis Report:</strong>{" "}
          {prescription.detailedDiagnosisReport}
        </p>
        <p>
          <strong>Allergies:</strong> {prescription.allergies}
        </p>
      </div>
      <div className="w-full flex flex-col gap-2">
        <p>
          <strong>Special Considerations:</strong>{" "}
          {prescription.specialConsiderations}
        </p>
        <p>
          <strong>Medicine Refills:</strong> {prescription.medicineRefills}
        </p>
        <table className="w-[70%] border-collapse border border-gray-500">
          <thead>
            <tr>
              <th className="border border-gray-500 px-4 py-2">Name</th>
              <th className="border border-gray-500 px-4 py-2">Dosage</th>
              <th className="border border-gray-500 px-4 py-2">Instructions</th>
            </tr>
          </thead>
          <tbody>
            {prescription.medicines.map((medicine, index) => (
              <tr key={index}>
                <td className="border border-gray-500 px-4 py-2">
                  {medicine.name}
                </td>
                <td className="border border-gray-500 px-4 py-2">
                  {medicine.dosage}
                </td>
                <td className="border border-gray-500 px-4 py-2">
                  {medicine.instructions}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="w-full p-1 flex justify-between items-center">
          <p>Signature: Dr. Jane Smith</p>
          <button className="btn btn-primary">Print</button>
        </div>
      </div>
    </div>
  ) : (
    <div className="w-full flex flex-col justify-center items-center p-5 gap-3">
      <div>
        {stage === 0 && (
          <MedicalDiagnosisComponent
            onNext={handleProceed}
            onSubmit={updatePrescription}
          />
        )}
        {stage === 1 && (
          <AllergiesComponent
            onNext={handleProceed}
            onSubmit={updatePrescription}
          />
        )}
        {stage === 2 && (
          <MedicinesComponent
            onNext={handleProceed}
            onSubmit={updatePrescription}
          />
        )}
        {stage === 3 && (
          <SpecialConsiderationsComponent onSubmit={createPrescriptions} />
        )}
      </div>
      <div>
        <StepsSection step={step} isPrescription={true} />
      </div>
    </div>
  );
};

export default Prescription;
