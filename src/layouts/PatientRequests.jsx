import { useEffect, useState } from "react";
import {
  collection,
  query,
  where,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";
import { db } from "../firebase";
import RequestCard from "../components/RequestCard";

const PatientRequests = ({ passedId = "COhXCCrjsDUiIJZMoDCw" }) => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const requestsRef = collection(db, "requests");
        const q = query(
          requestsRef,
          where("doctorId", "==", passedId),
          where("isAccepted", "==", false)
        );
        const querySnapshot = await getDocs(q);

        const requestData = await Promise.all(
          querySnapshot.docs.map(async (doc) => {
            const requestDataItem = {
              id: doc.id,
              ...doc.data(),
            };
            const patientDetails = await fetchPatientDetails(
              requestDataItem.userId
            );
            requestDataItem.patientDetails = patientDetails;
            return requestDataItem;
          })
        );

        setRequests(requestData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching requests:", error);
        setError("Failed to fetch requests. Please try again later.");
        setLoading(false);
      }
    };

    const fetchPatientDetails = async (userId) => {
      try {
        const usersRef = collection(db, "users");
        const userQuery = query(usersRef, where("userId", "==", userId));
        const userQuerySnapshot = await getDocs(userQuery);
        return userQuerySnapshot.docs[0].data();
      } catch (error) {
        console.error("Error fetching patient details:", error);
        return null;
      }
    };

    fetchRequests();
  }, [passedId]);

  const handleAccept = async (requestId, doctorId) => {
    try {
      // Update the request's status to accepted in the requests collection
      const requestDocRef = doc(db, "requests", requestId);
      await updateDoc(requestDocRef, { isAccepted: true });

      // Update the user's document to add the doctor's ID to the 'doctors' array
      const userRef = doc(db, "users", doctorId);
      await updateDoc(userRef, {
        doctors: arrayUnion(doctorId),
      });

      // Remove the accepted request from the local state
      setRequests((prevRequests) =>
        prevRequests.filter((req) => req.id !== requestId)
      );
    } catch (error) {
      console.error("Error accepting request:", error);
      // Handle error
    }
  };

  const handleReject = async (requestId) => {
    try {
      const requestDocRef = doc(db, "requests", requestId);
      await deleteDoc(requestDocRef);

      // Remove the rejected request from the local state
      setRequests((prevRequests) =>
        prevRequests.filter((req) => req.id !== requestId)
      );
    } catch (error) {
      console.error("Error rejecting request:", error);
      // Handle error
    }
  };

  return (
    <div>
      <h2>Requests for Doctor ID: {passedId}</h2>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <ul className="flex flex-col w-full gap-4">
        {requests.map((req) => (
          <RequestCard
            key={req.id}
            requestData={req}
            handleAccept={() => handleAccept(req.id)}
            handleReject={() => handleReject(req.id)}
          />
        ))}
      </ul>
    </div>
  );
};

export default PatientRequests;
