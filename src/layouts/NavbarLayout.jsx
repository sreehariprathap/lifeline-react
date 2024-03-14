import Navbar from "../components/Navbar";

const NavbarLayout = ({ children }) => {
  return (
    <div className="min-h-[100vh] min-w-full bg-primary-white text-primary-black">
      <Navbar />
      <div className="pt-20">{children}</div>
    </div>
  );
};

export default NavbarLayout;
