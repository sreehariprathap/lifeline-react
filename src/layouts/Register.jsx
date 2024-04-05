import RegisterForm from "../components/RegisterForm";

const Register = () => {
  return (
    <div className="h-[100vh] flex justify-around items-center">
      <div>
        <img src="/images/heroimg.png" alt="hero image" className="w-full" />
      </div>
      <RegisterForm />
    </div>
  );
};

export default Register;
