import { Link, useLocation } from "react-router-dom";
import AppIcon from "./AppIcon";
import { FiHome, FiPlusCircle } from "react-icons/fi";
import { FaUserDoctor } from "react-icons/fa6";
import { RiHistoryFill } from "react-icons/ri";

const Sidebar = ({ isDoctor = false }) => {
  const location = useLocation();

  // Define a function to determine if the given path matches the current URL
  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <div className="flex flex-col p-2 py-4 rounded-md shadow-md gap-5 bg-slate-50 w-18 items-center">
      {!isDoctor && (
        <Link to={"/appointments/create"}>
          <AppIcon
            styles={
              isActive("/appointments/create")
                ? "text-primary-color"
                : "hover:text-primary-color transition linear"
            }
          >
            {<FiPlusCircle className="w-6 h-6" />}
          </AppIcon>
        </Link>
      )}

      <Link to={isDoctor ? "/doctor/appointments" : "/appointments"}>
        <AppIcon
          styles={
            isActive("/appointments")
              ? "text-primary-color"
              : "hover:text-primary-color transition linear"
          }
        >
          {<FiHome className="w-6 h-6" />}
        </AppIcon>
      </Link>
      {!isDoctor && (
        <Link to="/doctors">
          <AppIcon
            styles={
              isActive("/doctors")
                ? "text-primary-color"
                : "hover:text-primary-color transition linear"
            }
          >
            {<FaUserDoctor className="w-6 h-6" />}
          </AppIcon>
        </Link>
      )}
      <Link to="/medical-history">
        <AppIcon
          styles={
            isActive("/medical-history")
              ? "text-primary-color"
              : "hover:text-primary-color transition linear"
          }
        >
          {<RiHistoryFill className="w-6 h-6" />}
        </AppIcon>
      </Link>
    </div>
  );
};

export default Sidebar;
