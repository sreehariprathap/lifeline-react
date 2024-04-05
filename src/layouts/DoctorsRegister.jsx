import DoctorRegisterForm from "../components/DoctorRegisterForm";

const DoctorsRegister = () => {
  return (
    <div className="h-[100vh] flex justify-around items-center">
      <div>
        <img src="/images/heroimg.png" alt="hero image" className="w-full" />
      </div>
      {/* Register form for doctors */}
      <div>
        <DoctorRegisterForm />
      </div>
    </div>
  );
};

export default DoctorsRegister;
