import { Steps } from "antd";

const StepsSection = ({ step, isPrescription = false }) => {
  if (isPrescription) {
    return (
      <div className="hidden lg:flex">
        <Steps
          current={step}
          items={[
            {
              title: "Add Diagnosis",
              description: "Please add diagnosis for the prescription",
            },
            {
              title: "Ask for Allergies",
              description: "Please ask for any allergies from the patient",
            },
            {
              title: "Prescribe Medicines",
              description: "Please prescribe medicines for the patient",
            },
            {
              title: "Special Considerations and Refills",
              description:
                "Please write down any special considerations and refills",
            },
          ]}
        />
      </div>
    );
  } else {
    return (
      <div>
        <Steps
          current={step}
          items={[
            {
              title: "Select Doctor",
              description: "Please select a doctor from the drop-down list",
            },
            {
              title: "Select Date",
              description: "Please select a date from the drop-down list",
            },
            {
              title: "Select Time Slot",
              description: "Please select a time slot to book the appointment",
            },
            {
              title: "Additional Information",
              description:
                "Please enter any additional information about the appointment",
            },
          ]}
        />
      </div>
    );
  }
};

export default StepsSection;
