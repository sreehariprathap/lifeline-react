import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import NavbarLayout from "./layouts/NavbarLayout.jsx";
import Login from "./layouts/Login.jsx";
import Register from "./layouts/Register.jsx";
import Dashboard from "./layouts/Dashboard.jsx";
import Appointments from "./layouts/Appointments.jsx";
import Profile from "./layouts/Profile.jsx";
import { Toaster } from "react-hot-toast";
import BookAppointment from "./layouts/BookAppointment.jsx";
import DoctorList from "./layouts/DoctorList.jsx";
import AddDoctor from "./layouts/AddDoctor.jsx";
import MedicalHistory from "./layouts/MedicalHistory.jsx";
import DoctorsRegister from "./layouts/DoctorsRegister.jsx";
import DoctorsLogin from "./layouts/DoctorsLogin.jsx";
import DoctorsDashboard from "./layouts/DoctorsDashboard.jsx";
import DoctorsAppointments from "./layouts/DoctorsAppointments.jsx";
import PatientRequests from "./layouts/PatientRequests.jsx";
import AddPrescription from "./layouts/AddPrescription.jsx";
import ViewPrescription from "./layouts/ViewPrescription.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <NavbarLayout isLanding={true}>
        <App />,
      </NavbarLayout>
    ),
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
    path: "/appointments/create",
    element: (
      <NavbarLayout>
        <Dashboard>
          <BookAppointment />
        </Dashboard>
      </NavbarLayout>
    ),
  },
  {
    path: "/doctors",
    element: (
      <NavbarLayout>
        <Dashboard>
          <DoctorList />
        </Dashboard>
      </NavbarLayout>
    ),
  },
  {
    path: "/doctors/add",
    element: (
      <NavbarLayout>
        <Dashboard>
          <AddDoctor />
        </Dashboard>
      </NavbarLayout>
    ),
  },
  {
    path: "/medical-history",
    element: (
      <NavbarLayout>
        <Dashboard>
          <MedicalHistory />
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
  {
    path: "/doctor/profile",
    element: (
      <NavbarLayout isDoctor={true}>
        <DoctorsDashboard>
          <Profile isDoctor={true} />
        </DoctorsDashboard>
      </NavbarLayout>
    ),
  },
  {
    path: "/doctor/register",
    element: (
      <NavbarLayout isDoctor={true}>
        <DoctorsRegister />
      </NavbarLayout>
    ),
  },
  {
    path: "/doctor/login",
    element: (
      <NavbarLayout isDoctor={true}>
        <DoctorsLogin />
      </NavbarLayout>
    ),
  },

  {
    path: "/doctor/appointments",
    element: (
      <NavbarLayout isDoctor={true}>
        <DoctorsDashboard>
          <DoctorsAppointments />
        </DoctorsDashboard>
      </NavbarLayout>
    ),
  },
  {
    path: "/doctor/appointments/:id",
    element: (
      <NavbarLayout isDoctor={true}>
        <DoctorsDashboard>
          <AddPrescription />
        </DoctorsDashboard>
      </NavbarLayout>
    ),
  },
  {
    path: "/prescription/:id",
    element: <ViewPrescription />,
  },
  {
    path: "/doctor/requests",
    element: (
      <NavbarLayout isDoctor={true}>
        <DoctorsDashboard>
          <PatientRequests />
        </DoctorsDashboard>
      </NavbarLayout>
    ),
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
    <Toaster />
  </React.StrictMode>
);
