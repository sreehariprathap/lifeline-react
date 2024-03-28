import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";
import { UserAuth } from "../contexts/AuthContext";
import toast from "react-hot-toast";
import { useState } from "react";

const ProfileCard = ({ doctor, isAdded = true }) => {
  const { user } = UserAuth();
  const [isRequested, setIsRequested] = useState(false);

  const handleRequest = async () => {
    try {
      // Create a new request document in the "requests" collection
      const requestRef = collection(db, "requests");

      await addDoc(requestRef, {
        userId: user.uid,
        doctorId: doctor.id,
        createdAt: serverTimestamp(),
        isAccepted: false,
      });
      // Show success message upon successful request creation
      toast.success("Request sent successfully!");
      setIsRequested(true);
    } catch (error) {
      console.error("Error creating request:", error);
      // Show error message or perform error handling as needed
      toast.error("Failed to send request. Please try again later.");
    }
  };

  return (
    <div className="card w-88 bg-base-100 shadow-xl">
      <div className="w-full flex p-4 justify-center items-center">
        <div className="avatar">
          <div className="w-24 rounded-full">
            <img
              src={
                doctor.imageUrl ||
                "https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
              }
              onError={(e) => {
                e.target.src =
                  "https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg";
              }}
              alt="Doctor Avatar"
            />
          </div>
        </div>
      </div>
      <div className="card-body">
        <h2 className="card-title">
          {doctor.firstName} {doctor.lastName}
        </h2>
        <p className="badge badge-primary px-1 py-1">{doctor.specialization}</p>
        <p>
          <strong>Office Location:</strong> {doctor.officeLocation}
        </p>
        <p>
          <strong>Email:</strong> {doctor.email}
        </p>
        <p>
          <strong>Phone:</strong> {doctor.phone}
        </p>
        <p>
          <strong>Registration Number:</strong> {doctor.registrationNumber}
        </p>
        <div className="card-actions justify-end">
          {isAdded && <button className="btn btn-primary">Request sent</button>}
          {!isAdded && (
            <button className="btn btn-primary" onClick={handleRequest}>
              {isRequested ? "Requested" : "Send Request"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
