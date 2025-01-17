import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../slices/user-slice";
import recordsSlice from "../slices/records-slice";
import statisticsSlice from "../slices/statistics-slice";

const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    records: recordsSlice.reducer,
    statistics: statisticsSlice.reducer,
  },
});

export default store;
