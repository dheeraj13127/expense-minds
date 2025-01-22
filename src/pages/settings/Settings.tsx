import { Route, Routes } from "react-router-dom";
import Categories from "./components/categories/Categories";
import Error from "../error/Error";
import Accounts from "./components/accounts/Accounts";

const Settings = () => {
  return (
    <div>
      <Routes>
        <Route path="/categories" element={<Categories />} />
        <Route path="/accounts" element={<Accounts />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </div>
  );
};

export default Settings;
