import { useParams } from "react-router-dom";

const AddPrescription = () => {
  const { id } = useParams();
  console.log(id);
  return <div className="text-7xl">{id}</div>;
};

export default AddPrescription;
