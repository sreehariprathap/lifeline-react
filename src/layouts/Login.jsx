import LoginForm from "../components/LoginForm";

const Login = () => {
  return (
    <div className="flex w-full justify-around items-center h-screen">
      <div>
        <img
          src="/src/assets/heroimg.png"
          alt="hero image"
          className="w-full"
        />
      </div>
      <LoginForm />
    </div>
  );
};

export default Login;
