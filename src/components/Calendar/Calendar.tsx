import { useState } from "react";
import dayjs from "dayjs";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { CalendarType } from "../../interfaces/Interfaces";
import { IoCloseCircleSharp } from "react-icons/io5";
const Calendar = ({
  calView,
  daysView,
  monthsView,
  setResult,
  result,
  setShowCalendar,
  setMonthsActive,
  setYearsActive,
}: CalendarType) => {
  const [view, setView] = useState<string>(calView);

  const generateCalendarDays = (result: dayjs.Dayjs) => {
    const startOfMonth = result.startOf("month").day();
    const daysInMonth = result.daysInMonth();
    const daysArray = [];

    for (let i = 0; i < startOfMonth; i++) {
      daysArray.push(null);
    }

    for (let i = 1; i <= daysInMonth; i++) {
      daysArray.push(i);
    }

    return daysArray;
  };

  const prevHandler = () => {
    if (view === "days") {
      setResult(result.subtract(1, "month"));
    } else if (view === "months") {
      setResult(result.subtract(1, "year"));
    } else if (view === "years") {
      setResult(result.subtract(10, "year"));
    }
  };

  const nextHandler = () => {
    if (view === "days") {
      setResult(result.add(1, "month"));
    } else if (view === "months") {
      setResult(result.add(1, "year"));
    } else if (view === "years") {
      setResult(result.add(10, "year"));
    }
  };

  const changeView = (newView: string) => {
    setView(newView);
  };

  const selectMonth = (monthIndex: number) => {
    setResult(result.month(monthIndex));
    if (daysView) {
      setView("days");
    } else {
      setMonthsActive?.(true);
      setShowCalendar(false);
    }
  };

  const selectYear = (year: number) => {
    setResult(result.year(year));
    if (monthsView) {
      setView("months");
    } else {
      setYearsActive?.(true);
      setShowCalendar(false);
      setView("days");
    }
  };
  const handleCloseCalendar = () => {
    setShowCalendar(false);
  };
  return (
    <div className="p-5 mx-auto relative max-w-md bg-slate-700 rounded border-2 border-white border-opacity-15">
      <div className="absolute -top-2 -right-3">
        <button
          onClick={handleCloseCalendar}
          className="bg-white p-1 rounded-full flex items-center"
        >
          <IoCloseCircleSharp />
        </button>
      </div>
      <div className="my-2 ">
        <p className="text-white text-center text-[10px]">
          Powered by <span className=" font-semibold">ExpenseMinds</span>
        </p>
      </div>
      <div className="flex justify-between items-center mb-5">
        <button
          onClick={prevHandler}
          className="p-2 text-white bg-primary-green rounded"
        >
          <FaArrowLeft />
        </button>
        <h2
          className="text-xl font-semibold cursor-pointer text-white"
          onClick={() =>
            changeView(
              view === "days"
                ? "months"
                : view === "months"
                ? "years"
                : view === "years"
                ? monthsView
                  ? "months"
                  : "days"
                : "days"
            )
          }
        >
          {view === "days"
            ? result.format("MMM YYYY")
            : view === "months"
            ? result.format("YYYY")
            : `${result.year()} - ${result.add(9, "year").year()}`}
        </h2>
        <button
          onClick={nextHandler}
          className="p-2 text-white bg-primary-green rounded"
        >
          <FaArrowRight />
        </button>
      </div>

      {view === "days" && (
        <div className="grid grid-cols-7 gap-1">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
            (day, index) => (
              <div key={index} className="text-center font-bold text-white">
                {day}
              </div>
            )
          )}

          {generateCalendarDays(result).map((day, index) => (
            <div
              key={index}
              className={`p-2 rounded w-full flex text-white items-center justify-center ${
                day === dayjs().date() && result.month() === dayjs().month()
                  ? "bg-gray-800"
                  : "bg-transparent"
              }`}
            >
              {day && <span className="text-sm font-medium">{day}</span>}
            </div>
          ))}
        </div>
      )}

      {view === "months" && (
        <div className="grid grid-cols-4 gap-4">
          {Array(12)
            .fill(null)
            .map((_, i) => (
              <div
                key={i}
                onClick={() => selectMonth(i)}
                className="p-2 w-full flex items-center justify-center cursor-pointer"
              >
                <span className="text-base font-medium text-white hover:text-primary-green duration-100 font-poppins">
                  {dayjs().month(i).format("MMM")}
                </span>
              </div>
            ))}
        </div>
      )}

      {view === "years" && (
        <div className="grid grid-cols-3 gap-4">
          {Array(10)
            .fill(null)
            .map((_, i) => (
              <div
                key={i}
                onClick={() => selectYear(result.year() + i)}
                className="p-2 w-full flex items-center justify-center cursor-pointer"
              >
                <span className="text-base font-medium text-white hover:text-primary-green duration-100 font-poppins">
                  {result.year() + i}
                </span>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default Calendar;
