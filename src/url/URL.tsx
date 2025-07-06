const backendURL = import.meta.env.VITE_BACKEND_URL;
export const prodSocketURL = import.meta.env.VITE_PROD_SOCKET_URL;
export const socketURL = import.meta.env.VITE_SOCKET_URL;
export const authenticationURL = backendURL + "/auth/google";
export const getUserProfileURL = backendURL + "/user/profile";
export const getUserCurrencyURL = backendURL + "/currency/user-currency";
export const createRecordURL = backendURL + "/record/create";
export const getRecordsByDayURL = backendURL + "/record/getRecords/day";
export const getRecordsByMonthURL = backendURL + "/record/getRecords/month";
export const getRecordsBySummaryURL = backendURL + "/record/getRecords/summary";
export const updateRecordURL = backendURL + "/record/update";
export const deleteRecordURL = backendURL + "/record/delete";
export const getStatisticsMonthlyURL = backendURL + "/statistics/monthly";
export const getStatisticsYearlyURL = backendURL + "/statistics/yearly";
export const createCategoryURL = backendURL + "/settings/category/create";
export const updateCategoryURL = backendURL + "/settings/category/update";
export const deleteCategoryURL = backendURL + "/settings/category/delete";
export const createSubAccountURL = backendURL + "/settings/account/create";
export const updateSubAccountURL = backendURL + "/settings/account/update";
export const deleteSubAccountURL = backendURL + "/settings/account/delete";
export const processRecordsByDaySummaryURL =
  backendURL + "/automated/day-summary";
export const processRecordsByMonthlySummaryURL =
  backendURL + "/automated/monthly-summary";
export const getConversationURL = backendURL + "/chat/getConversation";
export const getMessagesURL = backendURL + "/chat/getMessages";
export const indexRecordsToPineURL = backendURL + "/pinecone/indexRecords";
