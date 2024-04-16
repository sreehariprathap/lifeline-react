import { useEffect, useState } from "react";
import dayjs from "dayjs";

const DateBar = ({ getAppointmentsByDate }) => {
  const [days, setDays] = useState([]);
  const [selectedDay, setSelectedDay] = useState(null);

  useEffect(() => {
    const generateDays = () => {
      const currentDate = dayjs(); // Get today's date using dayjs
      const next14Days = Array.from({ length: 14 }, (_, index) => {
        const date = currentDate.add(index, "day"); // Increment date by index
        const dayOfWeek = date.format("dddd"); // Format day of the week
        const formattedDate = date.format("YYYY-MM-DD"); // Format date as "YYYY-MM-DD"
        getAppointmentsByDate(formattedDate);
        setSelectedDay(dayjs().format("YYYY-MM-DD"));
        return { day: dayOfWeek, date: formattedDate };
      });
      setDays(next14Days);
    };
    generateDays();
  }, []); // Empty dependency array ensures this effect runs only once on component mount

  const setSelectedDayHandler = (item) => {
    setSelectedDay(item.date);
    getAppointmentsByDate(item.date);
  };

  return (
    <div className="overflow-y-scroll p-3 scrollbar-hide">
      <div className="flex gap-5">
        {days.map((item) => (
          <div
            key={item.date}
            className={`p-5  text-primary-color font-semibold rounded-3xl h-24 w-14 items-center cursor-pointer flex flex-col justify-center ${
              selectedDay === item.date ? "bg-primary-color text-white ring" : ""
            }`}
            onClick={() => setSelectedDayHandler(item)}
          >
            <p>{item.day.slice(0, 3)}</p>
            <div className="div"></div>
            <p className="date">{dayjs(item.date).format("D")}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DateBar;
