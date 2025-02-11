import { Route, Routes } from "react-router-dom";
import Manual from "./components/manual/Manual";

import Error from "./components/error/Error";

const Transactions = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Manual />} />

        <Route path="*" element={<Error />} />
      </Routes>
    </div>
  );
};

export default Transactions;
