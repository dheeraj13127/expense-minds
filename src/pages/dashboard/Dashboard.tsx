import { Route, Routes } from "react-router-dom";
import Records from "../records/Records";
import Transactions from "../transactions/Transactions";
import Error from "./components/error/Error";
import Statistics from "../statistics/Statistics";
import Tools from "../tools/Tools";
import Settings from "../settings/Settings";
import Profile from "../profile/Profile";

const Dashboard = () => {
  return (
    <div>
      <Routes>
        <Route path="/records" element={<Records />} />
        <Route path="/transactions/*" element={<Transactions />} />
        <Route path="/statistics" element={<Statistics />} />
        <Route path="/tools" element={<Tools />} />
        <Route path="/settings/*" element={<Settings />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </div>
  );
};

export default Dashboard;
