import { Formik } from "formik";
import { useState } from "react";
import toast from "react-hot-toast";
import ProfileCard from "../components/ProfileCard";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase";

const AddDoctorForm = () => {
  const [doctor, setDoctor] = useState(null);

  const fetchDoctorByRegistrationNumber = async (registrationNumber) => {
    try {
      const doctorCollection = collection(db, "doctors");
      const querySnapshot = await getDocs(
        query(
          doctorCollection,
          where("registrationNumber", "==", registrationNumber)
        )
      );

      const doctorData = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      console.log(JSON.stringify(doctorData)); // Log the data to verify

      if (doctorData.length > 0) {
        setDoctor(doctorData[0]);
      } else {
        setDoctor(null);
        toast.error("No doctor found with the provided registration number");
      }
    } catch (error) {
      console.error("Error fetching doctor by registration number:", error);
      toast.error("Failed to fetch doctor. Please try again later.");
    }
  };

  return (
    <div className="p-4 flex flex-col gap-5 items-center">
      <h2 className="text-2xl font-bold">Search Doctor</h2>
      <Formik
        initialValues={{ registrationNumber: "" }}
        validate={(values) => {
          const errors = {};
          if (!values.registrationNumber) {
            errors.registrationNumber = "Please enter a registration number";
          } else if (!/^\d{10}$/i.test(values.registrationNumber)) {
            errors.registrationNumber = "Registration number must be 10 digits";
          }
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            console.log(values);
            fetchDoctorByRegistrationNumber(values.registrationNumber);
            setSubmitting(false);
          }, 400);
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          /* and other goodies */
        }) => (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col items-center gap-4 w-full"
          >
            <div className="flex flex-col items-center gap-1">
              <input
                type="text"
                name="registrationNumber"
                placeholder="Registration Number"
                className="input input-bordered grow"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.registrationNumber}
              />
              <p className="text-red-400 text-start w-full">
                {errors.registrationNumber &&
                  touched.registrationNumber &&
                  errors.registrationNumber}
              </p>
            </div>
            <button
              className="btn btn-primary"
              type="submit"
              disabled={isSubmitting}
            >
              Search
            </button>
          </form>
        )}
      </Formik>
      {doctor && <ProfileCard doctor={doctor} isAdded={false} />}
    </div>
  );
};

export default AddDoctorForm;
