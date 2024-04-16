import { useEffect, useState } from "react";
import {
  collection,
  query,
  where,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import RequestCard from "../components/RequestCard";
import Loader from "../components/Loader";
import toast from "react-hot-toast";

const PatientRequests = ({
  passedId = JSON.parse(localStorage.getItem("doctor")).userId,
}) => {
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

    fetchRequests();
  }, [passedId]);

  const handleAccept = async (requestId) => {
    try {
      // Update the request's status to accepted in the requests collection
      const requestDocRef = doc(db, "requests", requestId);
      await updateDoc(requestDocRef, { isAccepted: true });

      // Remove the accepted request from the local state
      setRequests((prevRequests) =>
        prevRequests.filter((req) => req.id !== requestId)
      );
      toast.success("Patient request accepted");
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
    <div className="bg-white shadow-lg p-5 py-10 rounded-md w-full">
      <h2>Patient requests</h2>
      {loading && (
        <div className="w-full h-screen flex justify-center items-center p-92">
          <Loader />
        </div>
      )}
      {error && <p>{error}</p>}
      <ul className="flex flex-col w-full gap-4">
        {requests.map((req) => (
          <RequestCard
            key={req.id}
            requestData={req}
            handleAccept={() => handleAccept(req.id, req.doctorId)}
            handleReject={() => handleReject(req.id)}
          />
        ))}
      </ul>
      {!requests.length && (
        <div className="">
          <h2 className="text-xl font-bold">No patint requests available</h2>
        </div>
      )}
    </div>
  );
};

export default PatientRequests;
