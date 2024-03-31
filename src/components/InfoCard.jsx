import AppIcon from "./AppIcon";

const InfoCard = ({ icon, title, textContent }) => {
  return (
    <div className=" bg-gradient-to-b from-[#1678F2] to-[#65A8FB] rounded-lg shadow-md flex p-3 gap-2 text-white">
      <div className="flex justify-center items-center w-10 h-full">
        <AppIcon>{icon}</AppIcon>
      </div>
      <div className="flex flex-col items-start">
        <h3 className="font-medium text-xl">{title}</h3>
        <p className="font-light">{textContent}</p>
      </div>
    </div>
  );
};

export default InfoCard;
