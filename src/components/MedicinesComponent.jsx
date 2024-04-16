import { Formik, Form, Field, ErrorMessage } from "formik";
import { useState } from "react";
import { MdDeleteOutline } from "react-icons/md";

const MedicinesComponent = ({ onNext }) => {
  const [medicines, setMedicines] = useState([{ name: "", dosage: "", instructions: "" }]);

  const handleAddMedicine = () => {
    setMedicines([...medicines, { name: "", dosage: "", instructions: "" }]);
  };

  const handleDeleteMedicine = (index) => {
    setMedicines((prevMedicines) => {
      const updatedMedicines = [...prevMedicines];
      updatedMedicines.splice(index, 1);
      return updatedMedicines;
    });
  };

  return (
    <Formik
      initialValues={{
        medicines: medicines,
      }}
      validate={(values) => {
        const errors = {};
        values.medicines.forEach((medicine, index) => {
          if (!medicine.name || !medicine.dosage || !medicine.instructions) {
            errors.medicines = errors.medicines || [];
            errors.medicines[index] = {};
            if (!medicine.name) errors.medicines[index].name = "Required";
            if (!medicine.dosage) errors.medicines[index].dosage = "Required";
            if (!medicine.instructions) errors.medicines[index].instructions = "Required";
          }
        });
        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        // Handle form submission here
        console.log(JSON.stringify(values));
        onNext(values);
        setSubmitting(false);
      }}
    >
      {({ isSubmitting }) => (
        <Form className="flex flex-col gap-8">
          <h2 className="text-xl text-center font-semibold">Medicines</h2>
          <table className="w-full">
            <thead>
              <tr>
                <th>Medicine</th>
                <th>Dosage</th>
                <th>Instructions</th>
                <th>Action</th> {/* Add a column for delete icon */}
              </tr>
            </thead>
            <tbody>
              {medicines.map((medicine, index) => (
                <tr key={index}>
                  <td>
                    <Field
                      type="text"
                      name={`medicines.${index}.name`}
                      className="input input-bordered"
                    />
                    <ErrorMessage
                      name={`medicines.${index}.name`}
                      component="p"
                      className="text-red-400 text-start"
                    />
                  </td>
                  <td>
                    <Field
                      type="text"
                      name={`medicines.${index}.dosage`}
                      className="input input-bordered"
                    />
                    <ErrorMessage
                      name={`medicines.${index}.dosage`}
                      component="p"
                      className="text-red-400 text-start"
                    />
                  </td>
                  <td>
                    <Field
                      type="text"
                      name={`medicines.${index}.instructions`}
                      className="input input-bordered"
                    />
                    <ErrorMessage
                      name={`medicines.${index}.instructions`}
                      component="p"
                      className="text-red-400 text-start"
                    />
                  </td>
                  <td>
                    <MdDeleteOutline
                      onClick={() => handleDeleteMedicine(index)}
                      className="cursor-pointer text-red-500"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="w-full flex justify-center items-center mt-8">
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleAddMedicine}
            >
              Add Medicine
            </button>
          </div>
          <div className="w-full flex justify-center items-center mt-8">
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isSubmitting}
            >
              Proceed to special considerations
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default MedicinesComponent;
