import { Route, Routes } from "react-router-dom";

import Landing from "./pages/landing/Landing";
import Dashboard from "./pages/dashboard/Dashboard";
import ProtectedRoute from "./utils/ProtectedRoute";
import Sidebar from "./components/Sidebar/Sidebar";
import Error from "./pages/error/Error";

const App = () => {
  return (
    <div className="">
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route
          path="/dashboard/*"
          element={
            <div className=" bg-zinc-800 h-screen scroll-smooth">
              <ProtectedRoute>
                <Sidebar>
                  <Dashboard />
                </Sidebar>
              </ProtectedRoute>
            </div>
          }
        />
        <Route path="*" element={<Error />} />
      </Routes>
    </div>
  );
};

export default App;
