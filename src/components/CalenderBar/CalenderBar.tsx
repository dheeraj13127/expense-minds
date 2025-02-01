/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import Calendar from "../Calendar/Calendar";

import { CalendarBarType } from "../../interfaces/Interfaces";

import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
const CalenderBar = ({
  calView,
  monthsView,
  daysView,
  result,
  setResult,
  handleFetchNewRecords,
  showArrows,
}: CalendarBarType) => {
  const [showCalendar, setShowCalendar] = useState<boolean>(false);
  const [monthsActive, setMonthsActive] = useState<boolean>(false);
  const [yearsActive, setYearsActive] = useState<boolean>(false);

  const handleShowCalendar = () => {
    setShowCalendar(!showCalendar);
  };
  useEffect(() => {
    if (monthsActive) {
      handleFetchNewRecords?.();
      setMonthsActive(false);
    }
  }, [handleFetchNewRecords, monthsActive]);
  useEffect(() => {
    if (yearsActive) {
      handleFetchNewRecords?.();
      setYearsActive(false);
    }
  }, [handleFetchNewRecords, yearsActive]);
  const handleNextDate = () => {
    if (calView === "months") {
      setResult(result.add(1, "month"));
      setMonthsActive(true);
    } else {
      setResult(result.add(1, "year"));
      setYearsActive(true);
    }
  };
  const handlePrevDate = () => {
    if (calView === "months") {
      setResult(result.subtract(1, "month"));
      setMonthsActive(true);
    } else {
      setResult(result.subtract(1, "year"));
      setYearsActive(true);
    }
  };
  return (
    <div>
      <div className="bg-black  px-2 py-2 relative flex justify-center ">
        {showArrows && (
          <div className="mt-0.5 mr-3">
            <button onClick={handlePrevDate}>
              <MdKeyboardArrowLeft size={20} color="white" />
            </button>
          </div>
        )}

        <div
          className="text-white font-inter cursor-pointer"
          onClick={handleShowCalendar}
        >
          {calView === "months"
            ? result.format("MMM YYYY")
            : calView === "years"
            ? result.format("YYYY")
            : result.format("DD MMM YYYY")}
        </div>
        {showArrows && (
          <div className="mt-0.5 ml-3">
            <button onClick={handleNextDate}>
              <MdKeyboardArrowRight size={20} color="white" />
            </button>
          </div>
        )}

        {showCalendar && (
          <div className=" absolute w-full">
            <Calendar
              calView={calView}
              daysView={daysView}
              monthsView={monthsView}
              setResult={setResult}
              result={result}
              setShowCalendar={setShowCalendar}
              setMonthsActive={setMonthsActive}
              setYearsActive={setYearsActive}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default CalenderBar;
