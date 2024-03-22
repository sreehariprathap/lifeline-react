import { Formik } from "formik";
import { useState } from "react";
import toast from "react-hot-toast";
import ProfileCard from "../components/ProfileCard";

const AddDoctorForm = () => {
  const [doctor, setDoctor] = useState(null);

  const searchDoctor = (healthcardNumber) => {
    // Simulated function to search for a doctor based on health card number
    // Replace this with your actual logic to search for a doctor
    // For demonstration, I'm just setting a dummy doctor object if the health card number matches
    if (healthcardNumber === "1234567890") {
      const dummyDoctor = {
        name: "Dr. John Doe",
        location: "123 Main Street, Cityville, Canada",
        healthcardNumber: "1234567890",
        specialization: "Cardiology",
        imageUrl: "https://example.com/doctor-avatar.jpg",
      };
      setDoctor(dummyDoctor);
    } else {
      setDoctor(null);
      toast.error("No doctor found with the provided health card number");
    }
  };

  return (
    <div className="p-4 flex flex-col gap-5 items-center">
      <h2 className="text-2xl font-bold">Search Doctor</h2>
      <Formik
        initialValues={{ healthcardNumber: "" }}
        validate={(values) => {
          const errors = {};
          if (!values.healthcardNumber) {
            errors.healthcardNumber = "Please enter a health card number";
          } else if (!/^\d{10}$/i.test(values.healthcardNumber)) {
            errors.healthcardNumber = "Health card number must be 10 digits";
          }
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            console.log(values);
            searchDoctor(values.healthcardNumber);
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
                name="healthcardNumber"
                placeholder="Health Card Number"
                className="input input-bordered grow"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.healthcardNumber}
              />
              <p className="text-red-400 text-start w-full">
                {errors.healthcardNumber &&
                  touched.healthcardNumber &&
                  errors.healthcardNumber}
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
      {doctor ? <ProfileCard doctor={doctor} isAdded={false} /> : null}
    </div>
  );
};

export default AddDoctorForm;
