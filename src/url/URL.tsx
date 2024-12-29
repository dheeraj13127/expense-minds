const backendURL = import.meta.env.VITE_BACKEND_URL;

export const authenticationURL = backendURL + "/auth/google";
export const getUserProfileURL = backendURL + "/user/profile";
export const getUserCurrencyURL = backendURL + "/currency/user-currency";
export const createRecordURL = backendURL + "/record/create";
export const getRecordsByDayURL = backendURL + "/record/getRecords/day";
export const getRecordsByMonthURL = backendURL + "/record/getRecords/month";
