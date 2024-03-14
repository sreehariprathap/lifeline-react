import AppIcon from "./AppIcon";
import { FiHome, FiPlusCircle } from "react-icons/fi";

const Sidebar = ({ triggerModal }) => {
  return (
    <div className="flex flex-col p-2 rounded-md shadow-md gap-5">
      <div onClick={triggerModal}>
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
