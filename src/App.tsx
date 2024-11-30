import { Route, Routes } from "react-router-dom";

import Landing from "./pages/landing/Landing";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Landing />} />
      </Routes>
    </div>
  );
};

export default App;
