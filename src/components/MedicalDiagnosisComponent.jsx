import { Formik, Form, Field, ErrorMessage } from "formik";

const MedicalDiagnosisComponent = ({ onNext }) => {


  return (
    <Formik
      initialValues={{ diagnosis: "", detailedDiagnosisReport: "" }}
      validate={(values) => {
        const errors = {};
        if (!values.diagnosis) {
          errors.diagnosis = "Please enter the medical condition";
        }
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
        <Form className="flex flex-col gap-3">
          <h2 className="text-xl text-center font-semibold">
            Medical Diagnosis
          </h2>
          <div className="flex flex-col items-start w-full gap-2">
            <label htmlFor="diagnosis">What is the medical condition?</label>
            <Field
              type="text"
              name="diagnosis"
              placeholder="Type here"
              className="input input-bordered w-full max-w-xs"
            />
            <ErrorMessage
              name="diagnosis"
              component="p"
              className="text-red-400 text-start w-full"
            />
          </div>
          <div className="flex flex-col items-start w-full gap-2">
            <label htmlFor="detailedDiagnosisReport">
              Detailed Diagnosis Report
            </label>
            <Field
              as="textarea"
              name="detailedDiagnosisReport"
              cols={50}
              className="input input-bordered"
            />
          </div>
          <div className="w-full flex justify-center items-center">
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isSubmitting}
            >
              Proceed to allergies
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default MedicalDiagnosisComponent;
