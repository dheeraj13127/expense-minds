import { Route, Routes } from "react-router-dom";
import DailyRecords from "./components/DailyRecords/DailyRecords";
import Error from "../error/Error";
import MonthlyRecords from "./components/MonthlyRecords/MonthlyRecords";

import Summary from "./components/Summary/Summary";

const Records = () => {
  return (
    <div className="grid grid-cols-12 ">
      <div className="col-span-12 h-fit">
        <Routes>
          <Route path="/daily" element={<DailyRecords />} />
          <Route path="/monthly" element={<MonthlyRecords />} />
          <Route path="/summary" element={<Summary />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </div>
    </div>
  );
};

export default Records;
