import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AuthContextProvider } from "./contexts/AuthContext.jsx";
import NavbarLayout from "./layouts/NavbarLayout.jsx";
import Login from "./layouts/Login.jsx";
import Register from "./layouts/Register.jsx";
import Dashboard from "./layouts/Dashboard.jsx";
import Appointments from "./layouts/Appointments.jsx";
import Profile from "./layouts/Profile.jsx";
import { Toaster } from "react-hot-toast";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/login",
    element: (
      <NavbarLayout>
        <Login />,
      </NavbarLayout>
    ),
  },
  {
    path: "/register",
    element: (
      <NavbarLayout>
        <Register />,
      </NavbarLayout>
    ),
  },
  {
    path: "/appointments",
    element: (
      <NavbarLayout>
        <Dashboard>
          <Appointments />
        </Dashboard>
      </NavbarLayout>
    ),
  },
  {
    path: "/profile",
    element: (
      <NavbarLayout>
        <Dashboard>
          <Profile />
        </Dashboard>
      </NavbarLayout>
    ),
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthContextProvider>
      <RouterProvider router={router} />
      <Toaster />
    </AuthContextProvider>
  </React.StrictMode>
);
