
import Sidebar from "../components/Sidebar";

const DoctorsDashboard = ({ children }) => {
  return (
    <div className="flex min-h-[80vh] scrollbar-hide">
      <div className=" h-[80vh] flex items-center pl-5">
        <Sidebar isDoctor={true} />
      </div>
      <div className="p-10 flex flex-col gap-3 w-full max-h-[80vh]">
        {children}
      </div>
    </div>
  );
};

export default DoctorsDashboard;
