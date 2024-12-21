import { Route, Routes } from "react-router-dom";
import DailyRecords from "./components/DailyRecords/DailyRecords";
import Error from "../error/Error";

const Records = () => {
  return (
    <div className="grid grid-cols-12 h-screen lg:h-full">
      <div className="col-span-12">
        <Routes>
          <Route path="/daily" element={<DailyRecords />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </div>
    </div>
  );
};

export default Records;
