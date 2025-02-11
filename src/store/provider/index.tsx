import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../slices/user-slice";
import recordsSlice from "../slices/records-slice";
import statisticsSlice from "../slices/statistics-slice";
import chatSlice from "../slices/chats-slice";

const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    records: recordsSlice.reducer,
    statistics: statisticsSlice.reducer,
    chat: chatSlice.reducer,
  },
});

export default store;
