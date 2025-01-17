import { Route, Routes } from "react-router-dom";
import StatisticsMonthly from "./components/StatisticsMonthly/StatisticsMonthly";
import Error from "../error/Error";
import StatisticsYearly from "./components/StatisticsYearly/StatisticsYearly";

const Statistics = () => {
  return (
    <div className="grid grid-cols-12 ">
      <div className="col-span-12 h-fit">
        <Routes>
          <Route path="/monthly" element={<StatisticsMonthly />} />
          <Route path="/yearly" element={<StatisticsYearly />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </div>
    </div>
  );
};

export default Statistics;
