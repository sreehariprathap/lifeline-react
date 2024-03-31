import { Formik } from "formik";
import { UserAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const LoginForm = () => {
  const { googleSignIn, loginWithEmailAndPassword } = UserAuth();
  const navigate = useNavigate();
  const onCredentialLogin = async (values) => {
    const [email, password] = values;
    try {
      await loginWithEmailAndPassword(email, password);
      navigate("/appointments");
      toast.success("Login successful!");
    } catch (error) {
      // Handle any errors that might occur during login
      console.error("Error logging in:", error);
      // Optionally, you can also display an error message to the user
      toast.error("Failed to login. Please try again later.");
      navigate("/login");
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await googleSignIn();
      navigate("/appointments");
      toast.success("Google login successful!");
    } catch (error) {
      // Handle any errors that might occur during Google sign-in
      console.error("Error with Google sign-in:", error);
      // Optionally, you can also display an error message to the user
      toast.error("Failed to sign in with Google. Please try again later.");
      navigate("/login");
    }
  };

  return (
    <div className="p-4 flex flex-col gap-5 items-center">
      <h2 className="text-2xl font-bold">Welcome Back</h2>

      <Formik
        initialValues={{ email: "", password: "" }}
        validate={(values) => {
          const errors = {};
          if (!values.email) {
            errors.email = "Please enter an email address";
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = "Invalid email address";
          }
          if (!values.password) {
            errors.password = "Please enter a password";
          }
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            console.log(values);
            onCredentialLogin(values);
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
            <div className=" flex flex-col items-center gap-1">
              <input
                type="text"
                name="email"
                placeholder="Email"
                className="input input-bordered grow"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
              />
              <p className="text-red-400 text-start w-full">
                {errors.email && touched.email && errors.email}
              </p>
            </div>
            <div className=" flex flex-col  items-center gap-2">
              <input
                type="password"
                name="password"
                className="input input-bordered grow"
                placeholder="Password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
              />
              <p className="text-red-400 text-start w-full">
                {errors.password && touched.password && errors.password}
              </p>
            </div>
            <button
              className="btn btn-primary"
              type="submit"
              disabled={isSubmitting}
            >
              Sign In
            </button>
          </form>
        )}
      </Formik>
      <div className="divider text-slate-950">OR</div>
      <button className="btn bg-slate-50" onClick={handleGoogleSignIn}>
        <img
          src="/src/assets/google.png"
          alt="google logo"
          className="w-5 h-5"
        />
      </button>
    </div>
  );
};

export default LoginForm;
