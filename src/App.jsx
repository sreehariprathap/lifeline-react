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
      <div className="flex flex-row justify-evenly gap-5 px-5 mb-5">
        <div className="w-[40%] flex items-start gap-3 flex-col justify-center">
          <p className="uppercase w-full text-start text-primary-green font-semibold">
            Presents
          </p>
          <h1 className=" text-start w-full font-bold text-5xl">
            A Dedicated doctor <br />
            you can trust
          </h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti
            eaque, neque repudiandae esse repellendus.
          </p>
          <AppButton
            link={!user ? "/login" : "/appointments"}
            textContent={"Book an appointment"}
            icon={<FiMessageCircle />}
          />
        </div>
        <div>
          <img src="/src/assets/heroimg.png" alt="hero image" />
        </div>
      </div>
      
      {/* info card section  */}
      <section className="flex gap-5 justify-center py-10">
        <InfoCard
          icon={<FiClock className="w-8 h-8" />}
          title={"dummy"}
          textContent={"lorem isum duy dummy dummy 2"}
        />
        <InfoCard
          icon={<FiCheckCircle className="w-8 h-8" />}
          title={"dummy"}
          textContent={"lorem isum duy dummy dummy 2"}
        />
        <InfoCard
          icon={<FiHeart className="w-8 h-8" />}
          title={"dummy"}
          textContent={"lorem isum duy dummy dummy 2"}
        />
      </section>

      {/* doctors trust section  */}
      <section className="h-screen flex justify-evenly gap-5 px-5 items-center">
        <div>
          <img src="/src/assets/doctors-trust.png" alt="trustable doctors" />
        </div>
        <div className="w-[40%] flex items-start gap-3 flex-col justify-center">
          <p className="uppercase w-full text-start text-primary-green font-semibold">
            About us
          </p>
          <h1 className="text-start w-full font-bold text-5xl">
            Dedicated doctors with the core mission to help
          </h1>
          <p>
            orem ipsum dolor sit amet, consectetur adipiscing elit. Quam proin
            nibh cursus at sed sagittis amet, sed. Tristique id nibh lobortis
            nunc elementum. Tellus quam mauris aenean turpis vulputate sodales
            nullam lobortis. Vulputate tortor tincidun.
          </p>
          <AppButton
            link={!user ? "/login" : "/appointments"}
            textContent={"Book an appointment"}
            icon={<FiMessageCircle />}
          />
        </div>
      </section>

      {/* doctors expertise section  */}
      <section className="h-screen flex flex-row-reverse justify-evenly gap-5 px-5 items-center">
        <div>
          <img src="/src/assets/visual.png" alt="trustable doctors" />
        </div>
        <div className="w-[40%] flex items-start gap-3 flex-col justify-center">
          <p className="uppercase w-full text-start text-primary-green font-semibold">
            Services
          </p>
          <h1 className="text-start w-full font-bold text-5xl">
            Experienced in multiple medical practices
          </h1>
          <p>
            orem ipsum dolor sit amet, consectetur adipiscing elit. Quam proin
            nibh cursus at sed sagittis amet, sed. Tristique id nibh lobortis
            nunc elementum. Tellus quam mauris aenean turpis vulputate sodales
            nullam lobortis. Vulputate tortor tincidun.
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
