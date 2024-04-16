import Navbar from "../components/Navbar";
import { AuthContextProvider } from "../contexts/AuthContext";

const NavbarLayout = ({ children, isLanding = false, isDoctor = false }) => {

  return (
    <AuthContextProvider>
      <div className="min-h-[100vh] min-w-full bg-primary-white text-primary-black scrollbar-hide ">
        <Navbar isLanding={isLanding} isDoctor={isDoctor} />
        <div className="pt-20">{children}</div>
      </div>
    </AuthContextProvider>
  );
};

export default NavbarLayout;
