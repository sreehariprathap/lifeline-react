import Sidebar from "../components/Sidebar";

const Dashboard = ({ children }) => {
  return (
    <div className="flex min-h-[80vh]">
      <div className=" h-[80vh] flex items-center pl-5">
        <Sidebar />
      </div>
      {children}
    </div>
  );
};

export default Dashboard;
