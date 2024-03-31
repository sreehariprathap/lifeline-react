import { Formik } from "formik";
import { UserAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const RegisterForm = () => {
  const { googleSignIn, RegisterWithEmailAndPassword } = UserAuth();
  const navigate = useNavigate();

  const onFormRegister = (values) => {
    RegisterWithEmailAndPassword(values);
    navigate("/appointments");
    toast.success("Registrtion successful!");
  };

  const handleGoogleSignIn = () => {
    googleSignIn().then(() => {
      navigate("/appointments");
      toast.success("Google registration successful!");
    });
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
          dob: "",
          gender: "",
          height: "",
          weight: "",
          healthCardNumber: "",
        }}
        validate={(values) => {
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
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = "Invalid email address";
          }

          if (!values.password) {
            errors.password = "Password is required";
          } else if (values.password.length < 6) {
            errors.password = "Password must be at least 6 characters";
          }
          if (!values.dob) {
            errors.dob = "Date of Birth is required";
          } else if (new Date(values.dob).getFullYear() > 2020) {
            errors.dob = "Date of Birth cannot be greater than 2020";
          }

          if (!values.gender) {
            errors.gender = "Gender is required";
          }

          if (!values.height) {
            errors.height = "Height is required";
          } else if (isNaN(values.height) || parseFloat(values.height) <= 0) {
            errors.height = "Invalid height";
          }

          if (!values.weight) {
            errors.weight = "Weight is required";
          } else if (isNaN(values.weight) || parseFloat(values.weight) <= 0) {
            errors.weight = "Invalid weight";
          }

          if (!values.healthCardNumber) {
            errors.healthCardNumber = "Health Card Number is required";
          } else if (!/^\d{10}$/.test(values.healthCardNumber)) {
            errors.healthCardNumber = "Health Card Number must be 10 digits";
          }

          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          // Handle form submission here
          console.log(values);
          onFormRegister(values);
          setSubmitting(false);
        }}
      >
        {({
          values,
          handleChange,
          handleSubmit,
          isSubmitting,
          errors,
          touched,
          handleBlur,
        }) => (
          <form
            onSubmit={handleSubmit}
            className="w-full max-w-md gap-2 flex flex-col"
          >
            {/* Form fields */}
            {/* First Name and Last Name */}
            <div className="flex flex-col gap-1">
              <div className="grid grid-cols-2 gap-5">
                <input
                  type="text"
                  name="firstName"
                  className="input"
                  placeholder="First Name"
                  onChange={handleChange}
                  value={values.firstName}
                />

                <input
                  type="text"
                  name="lastName"
                  className="input"
                  placeholder="Last Name"
                  onChange={handleChange}
                  value={values.lastName}
                />
              </div>
              <div className="grid grid-cols-2 gap-5">
                {errors.firstName && touched.firstName && (
                  <p className="text-red-400 text-start w-full">
                    {errors.firstName}
                  </p>
                )}
                {errors.lastName && touched.lastName && (
                  <p className="text-red-400 text-start w-full">
                    {errors.lastName}
                  </p>
                )}
              </div>
            </div>

            {/* Email */}
            <div className="flex flex-col items-center gap-1">
              <input
                type="email"
                name="email"
                placeholder="Email"
                className="input grow w-full"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
              />
              {errors.email && touched.email && (
                <p className="text-red-400 text-start w-full">{errors.email}</p>
              )}
            </div>

            {/* Password */}
            <input
              type="password"
              name="password"
              className="input w-full"
              placeholder="Password"
              onChange={handleChange}
              value={values.password}
            />
            {errors.password && touched.password && (
              <p className="text-red-400 text-start w-full">
                {errors.password}
              </p>
            )}
            {/* Date of Birth and Gender */}
            <div className="flex flex-col gap-1">
              <div className="grid grid-cols-2 gap-5">
                <input
                  type="date"
                  name="dob"
                  className="input"
                  placeholder="Date of Birth"
                  onChange={handleChange}
                  value={values.dob}
                />
                <select
                  name="gender"
                  className="input"
                  onChange={handleChange}
                  value={values.gender}
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                  <option value="notSpecified">Prefer Not To Answer</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-5">
                {errors.dob && touched.dob && (
                  <p className="text-red-400 text-start w-full">{errors.dob}</p>
                )}
                {errors.gender && touched.gender && (
                  <p className="text-red-400 text-start w-full">
                    {errors.gender}
                  </p>
                )}
              </div>
            </div>
            {/* Height and Weight */}
            <div className="flex flex-col gap-1">
              <div className="grid grid-cols-2 gap-5">
                <input
                  type="text"
                  name="height"
                  className="input"
                  placeholder="Enter Height"
                  onChange={handleChange}
                  value={values.height}
                />
                <input
                  type="text"
                  name="weight"
                  className="input"
                  placeholder="Enter Weight"
                  onChange={handleChange}
                  value={values.weight}
                />
              </div>
              <div className="grid grid-cols-2 gap-5">
                {errors.height && touched.height && (
                  <p className="text-red-400 text-start w-full">
                    {errors.height}
                  </p>
                )}
                {errors.weight && touched.weight && (
                  <p className="text-red-400 text-start w-full">
                    {errors.weight}
                  </p>
                )}
              </div>
            </div>
            {/* Health Card Number */}
            <div>
              <input
                type="text"
                name="healthCardNumber"
                className="input w-full"
                placeholder="Health Card number"
                onChange={handleChange}
                value={values.healthCardNumber}
              />
              <div>
                {errors.healthCardNumber && touched.healthCardNumber && (
                  <p className="text-red-400 text-start w-full">
                    {errors.healthCardNumber}
                  </p>
                )}
              </div>
            </div>
            {/* Register Button */}
            <button
              className="btn btn-primary"
              type="submit"
              disabled={isSubmitting}
            >
              Register
            </button>
          </form>
        )}
      </Formik>

      <div className="divider text-slate-950">OR</div>
      <button className="btn bg-slate-50" onClick={handleGoogleSignIn}>
        <img
          src="src/assets/google.png"
          alt="google logo"
          className="w-5 h-5"
        />
      </button>
    </div>
  );
};

export default RegisterForm;
