const PrescriptionCard = ({ prescription }) => {
  return (
    <div className="prescription-card p-4 bg-white shadow-md rounded-md w-full">
      <h2>Prescription #1234 | Date: {prescription.date} </h2>
      <div className="flex justify-between gap-2">
        <div className="mb-4">
          <h3 className="text-lg font-semibold">Patient Information:</h3>
          <p>Name: {prescription.patientName}</p>
          <p>Age: {prescription.patientAge}</p>
          <p>Gender: {prescription.patientGender}</p>
          <p>Address: {prescription.patientAddress}</p>
        </div>

        <div className="mb-4">
          <h3 className="text-lg font-semibold">Doctor Information:</h3>
          <p>Name: {prescription.doctorName}</p>
          <p>Contact: {prescription.doctorContact}</p>
          <p>Credentials: {prescription.doctorCredentials}</p>
        </div>
      </div>
      <div className="flex justify-between gap-2">
        <div className="mb-4">
          <h3 className="text-lg font-semibold">Medication:</h3>
          {prescription.medications.map((medication, index) => (
            <div key={index} className="mb-2">
              <p>Name: {medication.name}</p>
              <p>Dosage: {medication.dosage}</p>
              <p>Instructions: {medication.instructions}</p>
            </div>
          ))}
        </div>

        <div className="mb-4">
          <h3 className="text-lg font-semibold">
            Refills: {prescription.refills}
          </h3>
        </div>

        <div className="mb-4">
          <h3 className="text-lg font-semibold">
            Signature: {prescription.signature}
          </h3>
        </div>
      </div>

      <div className="flex justify-between gap-2">
        <div className="mb-4">
          <h3 className="text-lg font-semibold">Medical Diagnosis:</h3>
          <p>{prescription.diagnosis}</p>
        </div>

        <div className="mb-4">
          <h3 className="text-lg font-semibold">Allergies:</h3>
          <p>{prescription.allergies}</p>
        </div>

        <div className="mb-4">
          <h3 className="text-lg font-semibold">Special Considerations:</h3>
          <p>{prescription.specialConsiderations}</p>
        </div>
      </div>
      <div className="flex justify-end gap-3">
        <button className="btn btn-primary">Print</button>
        <button className="btn btn-primary">Download</button>
      </div>
    </div>
  );
};

export default PrescriptionCard;
