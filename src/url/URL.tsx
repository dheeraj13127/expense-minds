const backendURL = import.meta.env.VITE_BACKEND_URL;

export const authenticationURL = backendURL + "/auth/google";
export const getUserProfileURL = backendURL + "/user/profile";
export const getUserCurrencyURL = backendURL + "/currency/user-currency";
