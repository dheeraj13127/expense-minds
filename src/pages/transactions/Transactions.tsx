import { Route, Routes } from "react-router-dom";
import Manual from "./components/manual/Manual";
import Automated from "./components/automated/Automated";
import Error from "./components/error/Error";

const Transactions = () => {
  return (
    <div>
      <Routes>
        <Route path="/manual" element={<Manual />} />
        <Route path="/automated" element={<Automated />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </div>
  );
};

export default Transactions;
