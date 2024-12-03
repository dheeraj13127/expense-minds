import { Dispatch, useEffect } from "react";
import { Navigate, NavigateFunction, useNavigate } from "react-router-dom";
import { getUserProfileURL } from "../url/URL";

import axios from "axios";
import { useDispatch } from "react-redux";
import { UnknownAction } from "redux";
import { userActions } from "../store/slices/user-slice";

const checkAuthorizedToken = async (
  token: string | null,
  url: string,
  navigate: NavigateFunction,
  dispatch: Dispatch<UnknownAction>
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
    dispatch(
      userActions.setUserData({
        name: user.name,
        email: user.email,
        id: user._id,
        token,
      })
    );
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
  const dispatch = useDispatch();
  useEffect(() => {
    checkAuthorizedToken(token, getUserProfileURL, navigate, dispatch);
  }, [navigate, token, dispatch]);
  return token ? children : <Navigate to="/" replace />;
};

export default ProtectedRoute;
