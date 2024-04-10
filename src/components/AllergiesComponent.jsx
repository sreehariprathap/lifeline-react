import { Formik, Form, Field, ErrorMessage } from "formik";

const AllergiesComponent = ({ onNext }) => {
  return (
    <Formik
      initialValues={{ allergies: "" }}
      validate={(values) => {
        const errors = {};
        if (!values.allergies) {
          errors.allergies = "Please specify any allergies";
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
          <h2 className="text-xl text-center font-semibold">Allergies</h2>
          <div className="flex flex-col items-start w-full gap-2">
            <label htmlFor="allergies">Do you have any allergies?</label>
            <Field
              type="text"
              name="allergies"
              placeholder="Type here"
              className="input input-bordered w-full max-w-xs"
            />
            <ErrorMessage
              name="allergies"
              component="p"
              className="text-red-400 text-start w-full"
            />
          </div>
          <div className="w-full flex justify-center items-center">
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isSubmitting}
            >
              Proceed to prescribe medicines
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default AllergiesComponent;
