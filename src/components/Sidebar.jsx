import AppIcon from "./AppIcon";
import { FiHome, FiPlusCircle } from "react-icons/fi";
import { FaUserDoctor } from "react-icons/fa6";
import { RiHistoryFill } from "react-icons/ri";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="flex flex-col p-2 py-4 rounded-md shadow-md gap-5 bg-slate-50 w-18 items-center">
      <Link to={"/appointments/create"}>
        <AppIcon styles={"hover:text-primary-color transition linear"}>
          {<FiPlusCircle className="w-8 h-8" />}
        </AppIcon>
      </Link>
      <Link to="/appointments">
        <AppIcon styles={"hover:text-primary-color transition linear "}>
          {<FiHome className="w-8 h-8" />}
        </AppIcon>
      </Link>
      <Link to="/doctors">
        <AppIcon styles={"hover:text-primary-color transition linear "}>
          {<FaUserDoctor className="w-8 h-8" />}
        </AppIcon>
      </Link>
      <Link to="/medical-history">
        <AppIcon styles={"hover:text-primary-color transition linear "}>
          {<RiHistoryFill className="w-8 h-8" />}
        </AppIcon>
      </Link>
    </div>
  );
};

export default Sidebar;
