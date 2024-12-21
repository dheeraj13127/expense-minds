import React, { useState } from "react";
import Calendar from "../Calendar/Calendar";
import dayjs from "dayjs";

const CalenderHelper = () => {
  const [result, setResult] = useState<dayjs.Dayjs>(dayjs());
  return (
    <div>
      <Calendar
        calView="months"
        daysView={false}
        monthsView={true}
        setResult={setResult}
        result={result}
      />
    </div>
  );
};

export default CalenderHelper;
