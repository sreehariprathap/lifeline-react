
const PrescriptionCard = ({ prescription }) => {
  return (
    <div className="bg-white rounded-lg w-full flex flex-col justify-center items-start py-5 gap-3 px-4 ">
      {/* Prescription Info */}
      <div className="w-full flex flex-start gap-3 items-start">
        <p>
          <strong>Prescription ID:</strong> {prescription.id}
        </p>{" "}
        |
        <p>
          <strong>Date:</strong> {prescription.date}
        </p>{" "}
        |
        <p>
          <strong>Time:</strong> {prescription.slot}
        </p>
      </div>

      <h2 className="text-xl my-1 font-bold">Appointment Information</h2>
      {/* Patient and Doctor Info */}
      <div className="w-full flex justify-between items-start gap-2">
        <div>
          <p>
            <strong>Patient Name:</strong>{" "}
            {prescription.user.firstName} {prescription.user.lastName}
          </p>
          <p>
            <strong>Email:</strong> {prescription.user.email}
          </p>
          <p>
            <strong>Health Card:</strong> {prescription.user.healthCardNumber}
          </p>
          <p>
            <strong>Gender:</strong> {prescription.user.gender}
          </p>
        </div>
        <div>
          <p>
            <strong>Doctor:</strong> {prescription.doctor.firstName}{" "}
            {prescription.doctor.lastName}
          </p>
          <p>
            <strong>Email:</strong> {prescription.doctor.email}
          </p>
          <p>
            <strong>Phone:</strong> {prescription.doctor.phone}
          </p>
          <p>
            <strong>Office Location:</strong>{" "}
            {prescription.doctor.officeLocation}
          </p>
        </div>
      </div>

      <h2 className="text-xl my-1 font-bold">Diagnosis Information</h2>

      {/* Diagnosis Section */}
      <div className="w-full flex flex-col gap-2">
        <p>
          <strong>Diagnosis:</strong> {prescription.diagnosis}
        </p>
        <p>
          <strong>Detailed Diagnosis Report:</strong>{" "}
          {prescription.detailedDiagnosisReport}
        </p>
        <p>
          <strong>Allergies:</strong> {prescription.allergies}
        </p>
      </div>

      <h2 className="text-xl my-1 font-bold">Medical Prescription</h2>

      {/* Medicine Info */}
      <div className="w-full flex flex-col gap-2">
        {/* Special Considerations */}
        {prescription.specialConsiderations && (
          <div className="w-full flex flex-col gap-2">
            <p>
              <strong>Special Considerations:</strong>{" "}
              {prescription.specialConsiderations}
            </p>
          </div>
        )}

        {/* Medicine Refills */}
        <div className="w-full flex flex-col gap-2">
          <p>
            <strong>Medicine Refills:</strong>{" "}
            {prescription.medicineRefills || 0}
          </p>
        </div>
        <table className="w-[70%] border-collapse border border-gray-500">
          <thead>
            <tr>
              <th className="border border-gray-500 px-4 py-2">Name</th>
              <th className="border border-gray-500 px-4 py-2">Dosage</th>
              <th className="border border-gray-500 px-4 py-2">Instructions</th>
            </tr>
          </thead>
          <tbody>
            {prescription.medicines.map((medicine, index) => (
              <tr key={index}>
                <td className="border border-gray-500 px-4 py-2">
                  {medicine.name}
                </td>
                <td className="border border-gray-500 px-4 py-2">
                  {medicine.dosage}
                </td>
                <td className="border border-gray-500 px-4 py-2">
                  {medicine.instructions}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="w-full p-1 flex justify-between items-center">
          <p>
            <strong>
              Signature: Dr. {prescription.doctor.firstName}{" "}
              {prescription.doctor.lastName}
            </strong>
          </p>
          <a href={`prescription/${prescription.id}`} target="_blank">
            <button className="btn btn-primary">Print</button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default PrescriptionCard;
