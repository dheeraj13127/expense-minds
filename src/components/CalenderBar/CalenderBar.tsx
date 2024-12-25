/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import Calendar from "../Calendar/Calendar";

import { CalendarBarType } from "../../interfaces/Interfaces";

const CalenderBar = ({
  monthsView,
  daysView,
  result,
  setResult,
  handleFetchNewRecords,
}: CalendarBarType) => {
  const [showCalendar, setShowCalendar] = useState<boolean>(false);
  const [monthsActive, setMonthsActive] = useState<boolean>(false);
  const handleShowCalendar = () => {
    setShowCalendar(!showCalendar);
  };
  useEffect(() => {
    if (monthsActive) {
      handleFetchNewRecords();
      setMonthsActive(false);
    }
  }, [handleFetchNewRecords, monthsActive]);
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
              setMonthsActive={setMonthsActive}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default CalenderBar;
