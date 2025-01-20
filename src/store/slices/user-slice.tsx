import { createSlice, Slice } from "@reduxjs/toolkit";
import {
  GlobalActionType,
  UserSliceStateType,
} from "../../interfaces/Interfaces";

const userSlice: Slice = createSlice({
  name: "user",
  initialState: {
    name: "",
    email: "",
    id: "",
    token: "",
    accounts: [],
    categories: {
      expense: [],
      income: [],
    },
    currency: {
      country: "",
      name: "",
      symbol: "",
      _id: "",
    },
  },
  reducers: {
    setUserData(state: UserSliceStateType, action: GlobalActionType) {
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.id = action.payload.id;
      state.token = action.payload.token;
      state.accounts = action.payload.accounts;
      state.categories = action.payload.categories;
      state.currency = action.payload.currency;
    },
    addNewCategory(state: UserSliceStateType, action: GlobalActionType) {
      if (action.payload.categoryType === "expense") {
        state.categories.expense = action.payload.newCategory;
      } else {
        state.categories.income = action.payload.newCategory;
      }
    },
  },
});

export const userActions = userSlice.actions;
export default userSlice;
