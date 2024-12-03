import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { GoogleOAuthProvider } from "@react-oauth/google";
import store from "./store/provider/index.tsx";
import { Provider } from "react-redux";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Provider store={store}>
      <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
        <App />
      </GoogleOAuthProvider>
      <Toaster position="top-center" reverseOrder={false} />
    </Provider>
  </BrowserRouter>
);
