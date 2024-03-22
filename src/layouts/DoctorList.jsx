import AppIcon from "../components/AppIcon";
import { FiPlusCircle } from "react-icons/fi";
import ProfileCard from "../components/ProfileCard";
import { Link } from "react-router-dom";

const dummyDoctorsData = [
  {
    name: "Dr. John Doe",
    location: "123 Main Street, Cityville, Canada",
    healthcardNumber: "ABC123456",
    specialization: "Cardiology",
    imageUrl: "https://example.com/doctor1-avatar.jpg",
  },
  {
    name: "Dr. Jane Smith",
    location: "456 Elm Street, Townsville, Canada",
    healthcardNumber: "DEF789012",
    specialization: "Pediatrics",
    imageUrl: "https://example.com/doctor2-avatar.jpg",
  },
  {
    name: "Dr. Michael Johnson",
    location: "789 Oak Avenue, Villageton, Canada",
    healthcardNumber: "GHI345678",
    specialization: "Orthopedics",
    imageUrl: "https://example.com/doctor3-avatar.jpg",
  },
  {
    name: "Dr. Sarah Williams",
    location: "321 Cedar Road, Hamletville, Canada",
    healthcardNumber: "JKL901234",
    specialization: "Dermatology",
    imageUrl: "https://example.com/doctor4-avatar.jpg",
  },
];

const DoctorList = () => {
  return (
    <div className="flex flex-col gap-3">
      <div className="w-full flex justify-between items-center">
        <h1 className="app-header ">My Doctors</h1>
        <Link to={"/doctors/add"}>
          <AppIcon styles={""}>
            {
              <FiPlusCircle className="w-8 h-8 hover:text-primary-color transition linear" />
            }
          </AppIcon>
        </Link>
      </div>
      <div className=" flex flex-wrap gap-2">
        {dummyDoctorsData.map((doctor, index) => (
          <ProfileCard key={index} doctor={doctor} />
        ))}
      </div>
    </div>
  );
};

export default DoctorList;
