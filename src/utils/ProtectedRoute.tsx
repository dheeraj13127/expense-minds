import { useEffect } from "react";
import { Navigate, NavigateFunction, useNavigate } from "react-router-dom";
import { getUserProfileURL } from "../url/URL";

import axios from "axios";

const checkAuthorizedToken = async (
  token: string | null,
  url: string,
  navigate: NavigateFunction
) => {
  try {
    if (!token) {
      throw "token required";
    }
    const authorizedToken = await axios.get(url, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    const user = authorizedToken.data.user;
    if (!user) {
      navigate("/");
    }
  } catch (err) {
    console.log(err);
    navigate("/");
  }
};

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    checkAuthorizedToken(token, getUserProfileURL, navigate);
  }, [navigate, token]);
  return token ? children : <Navigate to="/" replace />;
};

export default ProtectedRoute;
