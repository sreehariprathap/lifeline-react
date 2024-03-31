import { message, Popconfirm } from "antd";

const AvailabilityMapper = ({ availabilityString, onSlotSelect }) => {
  const confirmSlotSelection = (index) => {
    // Create a modified availability string with the selected slot marked as 'B' for booked
    const modifiedAvailabilityString =
      availabilityString.substring(0, index) +
      "B" +
      availabilityString.substring(index + 1);

    // Calculate the start and end times for the selected slot
    const startTime = `${Math.floor(index / 2) + 9}:${
      index % 2 === 0 ? "00" : "30"
    }`;
    const endTime = `${Math.floor((index + 1) / 2) + 9}:${
      (index + 1) % 2 === 0 ? "00" : "30"
    }`;

    // Call the parent function with the modified availability string and slot details
    onSlotSelect(modifiedAvailabilityString, { startTime, endTime });
  };

  const confirm = (index) => {
    message.success("Slot selected");
    confirmSlotSelection(index);
  };

  const cancel = () => {
    message.error("Slot selection cancelled");
  };

  // Function to render slots based on availability string
  const renderSlots = () => {
    return availabilityString.split("").map((slot, index) => {
      // Determine slot status based on availability string
      let status;
      if (slot === "A") {
        status = "Available";
      } else if (slot === "N") {
        status = "Not Available";
      } else if (slot === "B") {
        status = "Booked";
      }
      // Calculate start and end times
      const startTime = `${Math.floor(index / 2) + 9}:${
        index % 2 === 0 ? "00" : "30"
      }`;
      const endTime = `${Math.floor((index + 1) / 2) + 9}:${
        (index + 1) % 2 === 0 ? "00" : "30"
      }`;
      // Render slot button inside Popconfirm
      return (
        <Popconfirm
          key={index}
          title="Confirm Slot Selection"
          onConfirm={() => confirm(index)}
          onCancel={cancel}
          okText="Yes"
          cancelText="No"
          colorText="#0B132B"
        >
          <button
            disabled={slot !== "A"}
            className={`btn btn-outline-primary tooltip`}
            data-tip={status}
          >
            {`${startTime} - ${endTime}`}
          </button>
        </Popconfirm>
      );
    });
  };

  return (
    <div>
      <h2>Availability</h2>
      <div className="flex flex-wrap gap-2">{renderSlots()}</div>
    </div>
  );
};

export default AvailabilityMapper;
