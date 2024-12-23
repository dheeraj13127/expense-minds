import { Dispatch, useEffect } from "react";
import { Navigate, NavigateFunction, useNavigate } from "react-router-dom";
import { getUserCurrencyURL, getUserProfileURL } from "../url/URL";

import axios from "axios";
import { useDispatch } from "react-redux";
import { UnknownAction } from "redux";
import { userActions } from "../store/slices/user-slice";
import toast from "react-hot-toast";

const checkAuthorizedToken = async (
  token: string | null,
  url: string,
  navigate: NavigateFunction,
  dispatch: Dispatch<UnknownAction>,
  currencyUrl: string
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
    const userCurrency = await axios.get(currencyUrl, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });

    dispatch(
      userActions.setUserData({
        name: user.name,
        email: user.email,
        id: user._id,
        token,
        accounts: user.accounts,
        categories: user.categories,
        currency: userCurrency.data.currency,
      })
    );
    if (!user) {
      toast.error("Session expired !");
      navigate("/");
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (err) {
    toast.error("Session expired !");
    navigate("/");
  }
};

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    checkAuthorizedToken(
      token,
      getUserProfileURL,
      navigate,
      dispatch,
      getUserCurrencyURL
    );
  }, [navigate, token, dispatch]);
  return token ? children : <Navigate to="/" replace />;
};

export default ProtectedRoute;
