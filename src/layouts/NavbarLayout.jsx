import Navbar from "../components/Navbar";

const NavbarLayout = ({ children,isLanding = false }) => {
  return (
    <div className="min-h-[100vh] min-w-full bg-primary-white text-primary-black scrollbar-hide ">
      <Navbar isLanding={isLanding} />
      <div className="pt-20">{children}</div>
    </div>
  );
};

export default NavbarLayout;
