import BookAppointment from "../components/BookAppointment";
import Sidebar from "../components/Sidebar";

const Dashboard = ({ children }) => {
  const onModalOpen = () => {
    console.log("onModalOpen");
    document.getElementById("my_modal_5").showModal();
  };

  return (
    <div className="flex min-h-[80vh]">
      <div className=" h-[80vh] flex items-center pl-5">
        <Sidebar triggerModal={onModalOpen} />

        <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Hello!</h3>
            <BookAppointment />
            <form method="dialog mt-3">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn">Close</button>
            </form>
          </div>
        </dialog>
      </div>
      {children}
    </div>
  );
};

export default Dashboard;
