import PrescriptionCard from "../components/PrescriptionCard";

const DummyPrescriptionData = [
  {
    patientName: "John Doe",
    patientAge: 35,
    patientGender: "Male",
    patientAddress: "123 Main Street, Cityville, Canada",
    doctorName: "Dr. Jane Smith",
    doctorContact: "123-456-7890",
    doctorCredentials: "MD, PhD",
    date: "2024-03-23",
    medications: [
      { name: "Medicine A", dosage: "10 mg", instructions: "Once daily" },
      { name: "Medicine B", dosage: "20 mg", instructions: "Twice daily" },
    ],
    refills: 2,
    signature: "Dr. Jane Smith",
    diagnosis: "Hypertension",
    allergies: "None",
    specialConsiderations: "Take with food",
  },
  {
    patientName: "Jane Doe",
    patientAge: 28,
    patientGender: "Female",
    patientAddress: "456 Elm Street, Townsville, Canada",
    doctorName: "Dr. John Doe",
    doctorContact: "987-654-3210",
    doctorCredentials: "DO",
    date: "2024-03-24",
    medications: [
      { name: "Medicine C", dosage: "15 mg", instructions: "Twice daily" },
      { name: "Medicine D", dosage: "25 mg", instructions: "Once daily" },
    ],
    refills: 1,
    signature: "Dr. John Doe",
    diagnosis: "Diabetes",
    allergies: "Penicillin",
    specialConsiderations: "Avoid alcohol",
  },
  {
    patientName: "Alice Smith",
    patientAge: 42,
    patientGender: "Female",
    patientAddress: "789 Oak Avenue, Villageton, Canada",
    doctorName: "Dr. Michael Johnson",
    doctorContact: "555-123-4567",
    doctorCredentials: "MD",
    date: "2024-03-25",
    medications: [
      { name: "Medicine E", dosage: "30 mg", instructions: "Once daily" },
      { name: "Medicine F", dosage: "40 mg", instructions: "Twice daily" },
    ],
    refills: 3,
    signature: "Dr. Michael Johnson",
    diagnosis: "Arthritis",
    allergies: "Shellfish",
    specialConsiderations: "Take with plenty of water",
  },
];

const MedicalHistory = () => {
  return (
    <div className="max-h-[80vh] ">
      <h1 className="app-header">Medical History and Prescriptions</h1>
      <div className="flex flex-col max-h-[80vh] overflow-y-scroll  gap-3 w-full p-1 py-4">
        {DummyPrescriptionData.map((prescription, index) => (
          <PrescriptionCard key={index} prescription={prescription} />
        ))}
      </div>
    </div>
  );
};

export default MedicalHistory;
