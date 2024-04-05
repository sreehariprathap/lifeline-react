import { UserAuth } from "../contexts/AuthContext";
import AppButton from "./AppButton";
import { FiLogIn, FiLock, FiMessageCircle } from "react-icons/fi";
import { LuStethoscope } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
const Navbar = ({ isLanding = false, isDoctor = false }) => {
  const { user, logOut } = UserAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logOut(); // Wait for the logout operation to complete
      navigate("/"); // Redirect the user to the homepage after logout
      toast.success("User logged out"); // Display a success message
    } catch (error) {
      console.error("Logout error:", error); // Log any errors that occur during logout
      toast.error("Failed to log out"); // Display an error message to the user
    }
  };

  return (
    <div>
      <div className="navbar bg-primary-white fixed top-0 z-50 flex justify-between gap-4 items-center px-5">
        <div className="">
          <img src="/images/logo-blue.png" alt="logo" className="w-48" />
        </div>
        {isLanding && (
          <div>
            <ul className="flex gap-5 text-slate-900">
              <li>Home</li>
              <li>About Us</li>
              <li>How It Works</li>
            </ul>
          </div>
        )}

        {isLanding && (
          <div className="flex gap-3">
            <AppButton
              link={!user ? "/login" : "/appointments"}
              textContent={"Book an appointment"}
              icon={<FiMessageCircle />}
            />
            <AppButton
              link={!user ? "/doctor/login" : "/doctor/appointments"}
              textContent={"Doctor"}
              icon={<LuStethoscope />}
            />
          </div>
        )}
        {!user && !isLanding && (
          <div className="flex gap-5">
            <AppButton
              link={isDoctor ? "/doctor/login" : "/login"}
              textContent={"login"}
              icon={FiLogIn}
            />
            <AppButton
              link={isDoctor ? "/doctor/register" : "/register"}
              textContent={"register"}
              icon={<FiLock />}
            />
          </div>
        )}

        {user && !isLanding && (
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS Navbar component"
                  src={
                    user
                      ? user.photoURL
                      : "https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                  }
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
            >
              <li>
                <a className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </a>
              </li>
              <li>
                <a>Settings</a>
              </li>
              <li>
                <a onClick={handleLogout}>Logout</a>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
