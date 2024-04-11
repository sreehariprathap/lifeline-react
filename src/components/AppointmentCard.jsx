import { useState } from "react";

const AppointmentCard = ({ appointment, isDoctor = false }) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  const userData = appointment.user; // Access userData from appointment.user
  console.log(appointment);

  // Function to calculate age from date of birth
  const calculateAge = (dob) => {
    const dobDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - dobDate.getFullYear();
    const monthDiff = today.getMonth() - dobDate.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < dobDate.getDate())
    ) {
      age--;
    }
    return age;
  };

  return (
    <div className="border rounded-md mb-4 flex flex-col bg-white w-full shadow-md p-5">
      <div className="flex items-center justify-between mb-2">
        <div className="flex flex-col gap-2">
          {!isDoctor && (
            <p className="badge badge-primary px-1 py-1">
              {appointment.doctor.specialization}
            </p>
          )}
          <h3 className="text-lg font-semibold">
            {!isDoctor ? appointment.doctor.firstName : userData.firstName}{" "}
            {!isDoctor ? appointment.doctor.lastName : userData.lastName}
          </h3>
        </div>
        <div className="flex flex-col gap-2">
          <p>Date: {appointment.date}</p>
          <p>Time Slot: {appointment.slot}</p>
        </div>
        <button
          className="text-blue-500 focus:outline-none btn-primary"
          onClick={toggleExpanded}
        >
          {expanded ? "Collapse" : "Expand"}
        </button>
      </div>
      {expanded && (
        <div className="flex justify-between items-center">
          <div>
            <p>Additional Info: {appointment.additionalInfo}</p>
            <p>
              {!isDoctor ? "Doctor's Email" : "User's Email"}:{" "}
              {!isDoctor ? appointment.doctor.email : userData.email}
            </p>
            {isDoctor && (
              <>
                <p>Age: {calculateAge(userData.dob)}</p>
                <p>Gender: {userData.gender}</p>
                <p>Height: {userData.height}</p>
                <p>Weight: {userData.weight}</p>
              </>
            )}
            {!isDoctor && (
              <p>Office Location: {appointment.doctor.officeLocation}</p>
            )}
          </div>
          {isDoctor && (
            <a
              href={`appointments/${appointment.id}`}
              className="btn btn-primary"
            >
              Start appointment
            </a>
          )}
          {/* Add more appointment details as needed */}
        </div>
      )}
    </div>
  );
};

export default AppointmentCard;
