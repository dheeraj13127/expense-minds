import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../slices/user-slice";
import recordsSlice from "../slices/records-slice";

const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    records: recordsSlice.reducer,
  },
});

export default store;
