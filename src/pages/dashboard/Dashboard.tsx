import { Route, Routes } from "react-router-dom";
import Records from "../records/Records";
import Transactions from "../transactions/Transactions";

const Dashboard = () => {
  return (
    <div>
      <Routes>
        <Route path="/records" element={<Records />} />
        <Route path="/transactions/*" element={<Transactions />} />
      </Routes>
    </div>
  );
};

export default Dashboard;
