/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import Calendar from "../Calendar/Calendar";
import dayjs from "dayjs";
import { CalendarBarType } from "../../interfaces/Interfaces";

const CalenderBar = ({ monthsView, daysView }: CalendarBarType) => {
  const [result, setResult] = useState<dayjs.Dayjs>(dayjs());

  console.log(result.format("MMM YYYY"));
  const [showCalendar, setShowCalendar] = useState<boolean>(false);
  const handleShowCalendar = () => {
    setShowCalendar(!showCalendar);
  };

  return (
    <div>
      <div className="bg-black border-b border-white border-opacity-50 px-2 py-2 relative flex justify-center ">
        <div
          className="text-white font-inter cursor-pointer"
          onClick={handleShowCalendar}
        >
          {result.format("MMM YYYY")}
        </div>
        {showCalendar && (
          <div className=" absolute w-full">
            <Calendar
              calView="months"
              daysView={daysView}
              monthsView={monthsView}
              setResult={setResult}
              result={result}
              setShowCalendar={setShowCalendar}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default CalenderBar;
