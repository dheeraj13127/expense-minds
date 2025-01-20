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
    toBeUpdatedCategory: {
      _id: "",
      categoryName: "",
      categorySymbol: "",
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
    setToBeUpdatedCategory(
      state: UserSliceStateType,
      action: GlobalActionType
    ) {
      state.toBeUpdatedCategory = action.payload.toBeUpdatedCategory;
    },
    updateExistingCategory(
      state: UserSliceStateType,
      action: GlobalActionType
    ) {
      const category = action.payload.category;
      if (action.payload.categoryType === "expense") {
        for (let i = 0; i < state.categories.expense.length; i++) {
          if (state.categories.expense[i]._id === category._id) {
            state.categories.expense[i] = category;
          }
        }
      } else {
        for (let i = 0; i < state.categories.income.length; i++) {
          if (state.categories.income[i]._id === category._id) {
            state.categories.income[i] = category;
          }
        }
      }
    },
    deleteExistingCategory(
      state: UserSliceStateType,
      action: GlobalActionType
    ) {
      const id = action.payload.id;
      if (action.payload.categoryType === "expense") {
        state.categories.expense = state.categories.expense.filter(
          (exp) => exp._id !== id
        );
      } else {
        state.categories.income = state.categories.income.filter(
          (exp) => exp._id !== id
        );
      }
    },
  },
});

export const userActions = userSlice.actions;
export default userSlice;
