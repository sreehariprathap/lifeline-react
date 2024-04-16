import "./App.css";
import AppButton from "./components/AppButton";
import InfoCard from "./components/InfoCard";
import { UserAuth } from "./contexts/AuthContext";
import {
  FiMessageCircle,
  FiClock,
  FiCheckCircle,
  FiHeart,
} from "react-icons/fi";

function App() {
  const { user } = UserAuth();
  return (
    <>
      {/* hero section  */}
      <div className="flex flex-row justify-evenly gap-5 px-5 mb-5"id="home">
        <div className="w-[40%] flex items-start gap-3 flex-col justify-center">
          <p className="uppercase w-full text-start text-primary-green font-semibold">
            Presents
          </p>
          <h1 className=" text-start w-full font-bold text-5xl">
            A Dedicated doctor <br />
            you can trust
          </h1>
          <p>
            Bridging the Gap Between Doctors and Patients. Our app seamlessly
            connects patients with trusted doctors, ensuring prompt, reliable
            healthcare access. With Lifeline, find your dedicated doctor, ready
            to provide expert care at your fingertips. Trust, convenience, and
            quality care, all in one place.
          </p>
          <AppButton
            link={!user ? "/login" : "/appointments"}
            textContent={"Book an appointment"}
            icon={<FiMessageCircle />}
          />
        </div>
        <div>
          <img src="/images/heroimg.png" alt="hero image" />
        </div>
      </div>

      {/* info card section  */}
      <section className="flex gap-5 justify-center py-10">
        <InfoCard
          icon={<FiClock className="w-8 h-8" />}
          title={"Scheduled appointments"}
          textContent={"create timely appointments"}
        />
        <InfoCard
          icon={<FiCheckCircle className="w-8 h-8" />}
          title={"Easy prescription"}
          textContent={"Prescription has never been easier"}
        />
        <InfoCard
          icon={<FiHeart className="w-8 h-8" />}
          title={"Quality guaranteed"}
          textContent={"Connecting with the best"}
        />
      </section>

      {/* doctors trust section  */}
      <section className="h-screen flex justify-evenly gap-5 px-5 items-center" id="about">
        <div>
          <img src="/images/doctors-trust.png" alt="trustable doctors" />
        </div>
        <div className="w-[40%] flex items-start gap-3 flex-col justify-center">
          <p className="uppercase w-full text-start text-primary-green font-semibold">
            About us
          </p>
          <h1 className="text-start w-full font-bold text-5xl">
            Dedicated doctors with the core mission to help
          </h1>
          <p>
            Lifeline brings together a network of compassionate doctors, driven
            by the core mission of providing unwavering support and care.
          </p>
          <AppButton
            link={!user ? "/login" : "/appointments"}
            textContent={"Book an appointment"}
            icon={<FiMessageCircle />}
          />
        </div>
      </section>

      {/* doctors expertise section  */}
      <section className="h-screen flex flex-row-reverse justify-evenly gap-5 px-5 items-center" id="services">
        <div>
          <img src="/images/Visual.png" alt="trustable doctors" />
        </div>
        <div className="w-[40%] flex items-start gap-3 flex-col justify-center">
          <p className="uppercase w-full text-start text-primary-green font-semibold">
            Services
          </p>
          <h1 className="text-start w-full font-bold text-5xl">
            Experienced in multiple medical practices
          </h1>
          <p>
            Your Trusted Partner for Quality Solutions. With a wealth of
            expertise, we specialize in delivering top-notch services tailored
            to meet your needs. From consultation to execution, our seasoned
            professionals ensure a seamless experience, providing innovative
            solutions and unparalleled support. Trust us to elevate your
            business with our proven track record of excellence and dedication
            to customer satisfaction
          </p>
          <AppButton
            link={!user ? "/login" : "/appointments"}
            textContent={"Book an appointment"}
            icon={<FiMessageCircle />}
          />
        </div>
      </section>
    </>
  );
}

export default App;
