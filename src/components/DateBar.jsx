import { useEffect, useState } from "react";
import dayjs from "dayjs";

const DateBar = ({ days, getAppointmentsByDate }) => {
  const [selectedDay, setSelectedDay] = useState();

  useEffect(() => {
    // Get today's date in "YYYY-MM-DD" format
    const today = new Date().toISOString().split("T")[0];
    // Find the day object corresponding to today's date
    const todayDay = days.find((item) => item.date === today);
    // Set today's date as the default selected day
    setSelectedDay(todayDay);
    getAppointmentsByDate(today);
  }, [days]); // Run this effect when the days array changes

  const setSelectedDayHandler = (item) => {
    setSelectedDay(item);
    getAppointmentsByDate(dayjs(item.date).subtract(1, "day").format("YYYY-MM-DD"));
  };

  return (
    <div>
      <div className="flex gap-5 overflow-y-scroll p-3 scrollbar-hide">
        {days.map((item) => (
          <div
            key={item.date}
            className={`p-5  text-primary-color font-semibold rounded-3xl h-24 w-14 items-center cursor-pointer flex flex-col justify-center ${
              selectedDay === item ? "bg-primary-color text-white ring" : ""
            }`}
            onClick={() => setSelectedDayHandler(item)}
          >
            <p>{item.day.slice(0, 3)}</p>
            <div className="div"></div>
            <p className="date">{new Date(item.date).getDate()}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DateBar;
