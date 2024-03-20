import AppIcon from "./AppIcon";
import { FiHome, FiPlusCircle } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();

  const goToCreateAppointment = () => {
    navigate("/appointments/create"); // Redirect the user to the homepage after logout
  };

  return (
    <div className="flex flex-col p-2 rounded-md shadow-md gap-5">
      <div onClick={goToCreateAppointment}>
        <AppIcon styles={"hover:text-primary-color transition linear"}>
          {<FiPlusCircle />}
        </AppIcon>
      </div>
      <AppIcon styles={"hover:text-primary-color transition linear "}>
        {<FiHome />}
      </AppIcon>
    </div>
  );
};

export default Sidebar;
