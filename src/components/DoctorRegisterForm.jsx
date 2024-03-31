import { Formik, Field, Form, ErrorMessage } from "formik";
import { UserAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const DoctorRegisterForm = () => {
  const { RegisterWithEmailAndPassword } = UserAuth();
  const navigate = useNavigate();

  const onFormRegister = async (values) => {
    try {
      await RegisterWithEmailAndPassword(values, true);
      navigate("/doctor/appointments");
      toast.success("Registration successful!");
    } catch (error) {
      console.error("Error registering:", error);
      toast.error("Failed to register. Please try again later.");
    }
  };

  const validate = (values) => {
    const errors = {};

    // Add validation rules for each field
    if (!values.firstName) {
      errors.firstName = "First Name is required";
    }

    if (!values.lastName) {
      errors.lastName = "Last Name is required";
    }

    if (!values.email) {
      errors.email = "Email is required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
      errors.email = "Invalid email address";
    }

    if (!values.password) {
      errors.password = "Password number is required";
    }
    if (!values.phone) {
      errors.phone = "Phone number is required";
    }

    if (!values.registrationNumber) {
      errors.registrationNumber = "Registration number is required";
    }

    if (!values.officeLocation) {
      errors.officeLocation = "Office location is required";
    }

    if (!values.specialization) {
      errors.specialization = "Specialization is required";
    }

    return errors;
  };

  return (
    <div className="p-4 flex flex-col gap-5 items-center">
      <h2 className="text-2xl font-bold">Join Us</h2>

      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          phone: "",
          registrationNumber: "",
          officeLocation: "",
          specialization: "",
        }}
        validate={validate}
        onSubmit={(values, { setSubmitting }) => {
          onFormRegister(values);
          setSubmitting(false);
        }}
      >
        {({ isSubmitting }) => (
          <Form className="w-full max-w-md gap-2 flex flex-col py-5">
            <div className="flex flex-col gap-1">
              <div className="grid grid-cols-2 gap-5">
                {/* First Name field */}
                <Field
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  className="input"
                />

                {/* Last Name field */}
                <Field
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  className="input"
                />
              </div>
              {/* Error messages for First Name and Last Name */}
              <div className="grid grid-cols-2 gap-5">
                <ErrorMessage
                  name="firstName"
                  component="div"
                  className="text-red-400 text-start w-full"
                />
                <ErrorMessage
                  name="lastName"
                  component="div"
                  className="text-red-400 text-start w-full"
                />
              </div>
            </div>

            {/* Email field */}
            <div className="flex flex-col gap-1">
              <Field
                type="email"
                name="email"
                placeholder="Email"
                className="input"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-red-400"
              />
            </div>

            {/* Password field */}
            <div className="flex flex-col gap-1">
              <Field
                type="password"
                name="password"
                placeholder="password"
                className="input"
              />
              <ErrorMessage
                name="password"
                component="div"
                className="text-red-400"
              />
            </div>

            {/* Phone field */}
            <div className="flex flex-col gap-1">
              <Field
                type="text"
                name="phone"
                placeholder="Phone"
                className="input"
              />
              <ErrorMessage
                name="phone"
                component="div"
                className="text-red-400"
              />
            </div>

            {/* Registration Number field */}
            <div className="flex flex-col gap-1">
              <Field
                type="text"
                name="registrationNumber"
                placeholder="Registration Number"
                className="input"
              />
              <ErrorMessage
                name="registrationNumber"
                component="div"
                className="text-red-400"
              />
            </div>

            {/* Office Location field */}
            <div className="flex flex-col gap-1">
              <Field
                type="text"
                name="officeLocation"
                placeholder="Office Location"
                className="input"
              />
              <ErrorMessage
                name="officeLocation"
                component="div"
                className="text-red-400"
              />
            </div>

            {/* Specialization field */}
            <div className="flex flex-col gap-1">
              <Field as="select" name="specialization" className="input">
                <option value="">Select Specialization</option>
                <option value="Cardiology">Cardiology</option>
                <option value="Dermatology">Dermatology</option>
                <option value="Endocrinology">Endocrinology</option>
                <option value="Gastroenterology">Gastroenterology</option>
                <option value="Hematology">Hematology</option>
                <option value="Infectious Disease">Infectious Disease</option>
                <option value="Nephrology">Nephrology</option>
                <option value="Neurology">Neurology</option>
                <option value="Oncology">Oncology</option>
                <option value="Ophthalmology">Ophthalmology</option>
                <option value="Orthopedics">Orthopedics</option>
                <option value="Otolaryngology">Otolaryngology (ENT)</option>
                <option value="Pediatrics">Pediatrics</option>
                <option value="Psychiatry">Psychiatry</option>
                <option value="Pulmonology">Pulmonology</option>
                <option value="Rheumatology">Rheumatology</option>
                <option value="Urology">Urology</option>
                <option value="Obstetrics and Gynecology">
                  Obstetrics and Gynecology
                </option>
                <option value="Anesthesiology">Anesthesiology</option>
                <option value="Plastic Surgery">Plastic Surgery</option>
              </Field>
              <ErrorMessage
                name="specialization"
                component="div"
                className="text-red-400"
              />
            </div>

            {/* Submit button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn btn-primary mt-5"
            >
              Register
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default DoctorRegisterForm;
