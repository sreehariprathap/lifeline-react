const ProfileCard = ({ doctor, isAdded = true }) => {
  return (
    <div className="card w-88 bg-base-100 shadow-xl">
      <div className="w-full flex p-4 justify-center items-center">
        <div className="avatar">
          <div className="w-24 rounded-full">
            <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
            {/* <img src={doctor.imageUrl} /> */}
          </div>
        </div>
      </div>
      <div className="card-body">
        <h2 className="card-title">{doctor.name}</h2>
        <p className="badge badge-primary px-1 py-1">{doctor.specialization}</p>
        <p>{doctor.location}</p>
        <p>{doctor.healthcardNumber}</p>
        <div className="card-actions justify-end">
          {isAdded && (
            <button className="btn btn-primary">Remove Doctor</button>
          )}
          {!isAdded && (
            <button className="btn btn-primary">Send Request</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
