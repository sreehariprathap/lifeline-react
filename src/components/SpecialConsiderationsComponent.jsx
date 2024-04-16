import { Formik, Form, Field, ErrorMessage } from "formik";

const SpecialConsiderationsComponent = ({ onNext }) => {

  return (
    <Formik
      initialValues={{
        specialConsiderations: "",
        medicineRefills: "",
      }}
      validate={(values) => {
        const errors = {};
        if (!values.specialConsiderations) {
          errors.specialConsiderations = "Special considerations are required";
        }
        if (!values.medicineRefills) {
          errors.medicineRefills = "Medicine refills are required";
        }
        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        console.log(JSON.stringify(values));
        onNext(values);
        setSubmitting(false);
      }}
    >
      {({ isSubmitting }) => (
        <Form className="flex flex-col gap-3">
          <h2 className="text-xl text-center font-semibold">
            Special Considerations and Medicine Refills
          </h2>
          <div className="flex flex-col items-start w-full gap-2">
            <label htmlFor="specialConsiderations">
              Special Considerations
            </label>
            <Field
              as="textarea"
              id="specialConsiderations"
              name="specialConsiderations"
              cols={50}
              className="input input-bordered"
            />
            <ErrorMessage
              name="specialConsiderations"
              component="p"
              className="text-red-400 text-start"
            />
          </div>
          <div className="flex flex-col items-start w-full gap-2">
            <label htmlFor="medicineRefills">Medicine Refills</label>
            <Field
              as="textarea"
              id="medicineRefills"
              name="medicineRefills"
              cols={50}
              className="input input-bordered"
            />
            <ErrorMessage
              name="medicineRefills"
              component="p"
              className="text-red-400 text-start"
            />
          </div>
          <div className="w-full flex justify-center items-center">
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isSubmitting}
            >
              Finish prescription
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default SpecialConsiderationsComponent;
