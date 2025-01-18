import { Route, Routes } from "react-router-dom";
import Categories from "./components/categories/Categories";
import Error from "../error/Error";

const Settings = () => {
  return (
    <div>
      <Routes>
        <Route path="/categories" element={<Categories />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </div>
  );
};

export default Settings;
