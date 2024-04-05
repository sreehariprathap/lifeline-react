import { Formik, Field, Form, ErrorMessage } from "formik";
import { UserAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const DoctorsLogin = () => {
  const { loginWithEmailAndPassword } = UserAuth();
  const navigate = useNavigate();

  const onCredentialLogin = async (values) => {
    const { email, password } = values;
    try {
      await loginWithEmailAndPassword(email, password);
      navigate("/dashboard");
      toast.success("Login successful!");
    } catch (error) {
      console.error("Error logging in:", error);
      toast.error("Failed to login. Please try again later.");
    }
  };

  const handleFormSubmit = async (values, { setSubmitting }) => {
    try {
      await onCredentialLogin(values);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex w-full justify-around items-center h-[80vh]">
      <div className="flex w-[50%] justify-center items-center p-10">
        <img src="/images/heroimg.png" alt="hero image" className="w-full" />
      </div>
      <div className="flex flex-col w-[50%] justify-center items-center gap-5">
        <h2 className="text-2xl font-bold">Welcome Back</h2>
        <Formik
          initialValues={{ email: "", password: "" }}
          validate={(values) => {
            const errors = {};
            if (!values.email) {
              errors.email = "Email is required";
            } else if (
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
            ) {
              errors.email = "Invalid email address";
            }
            if (!values.password) {
              errors.password = "Password is required";
            }
            return errors;
          }}
          onSubmit={handleFormSubmit}
        >
          {({
            isSubmitting,
            /* and other goodies */
          }) => (
            <Form className="flex flex-col items-center gap-4 w-full">
              <div className=" flex flex-col items-center gap-1">
                <Field
                  type="email"
                  name="email"
                  placeholder="Email"
                  className="input input-bordered grow"
                />
                <ErrorMessage
                  name="email"
                  component="p"
                  className="text-red-400 text-start w-full"
                />
              </div>
              <div className=" flex flex-col items-center gap-2">
                <Field
                  type="password"
                  name="password"
                  placeholder="Password"
                  className="input input-bordered grow"
                />
                <ErrorMessage
                  name="password"
                  component="p"
                  className="text-red-400 text-start w-full"
                />
              </div>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={isSubmitting}
              >
                Sign In
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default DoctorsLogin;
