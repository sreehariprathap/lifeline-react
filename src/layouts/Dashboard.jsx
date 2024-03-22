import Sidebar from "../components/Sidebar";

const Dashboard = ({ children }) => {
  return (
    <div className="flex min-h-[80vh]">
      <div className=" h-[80vh] flex items-center pl-5">
        <Sidebar />
      </div>
      <div className="p-10 flex flex-col gap-3 w-full">{children}</div>
    </div>
  );
};

export default Dashboard;
