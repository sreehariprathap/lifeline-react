import { Steps } from "antd";

const StepsSection = ({ step }) => {
  return (
    <div>
      <Steps
        current={step}
        items={[
          {
            title: "Select Doctor",
            description: "Please select a doctor from the drop down list",
          },
          {
            title: "Select Date",
            description: "Plase select a date from the drop down list",
          },
          {
            title: "Select Time Slot",
            description: "Plase select a time slot to book appointment",
          },
          {
            title: "Additional Information",
            description:
              "Plase enter any additional information about the appointment",
          },
        ]}
      />
    </div>
  );
};

export default StepsSection;
