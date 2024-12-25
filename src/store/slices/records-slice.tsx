import { createSlice, Slice } from "@reduxjs/toolkit";
import {
  GlobalActionType,
  RecordsSliceType,
} from "../../interfaces/Interfaces";

const recordsSlice: Slice = createSlice({
  name: "records",
  initialState: {
    income: 0,
    expense: 0,
    total: 0,
    recordsData: [],
  },
  reducers: {
    setRecordsDataAndState(state: RecordsSliceType, action: GlobalActionType) {
      state.income = action.payload.income;
      state.expense = action.payload.expense;
      state.total = action.payload.total;
      state.recordsData = action.payload.recordsData;
    },
    updateRecordsDataAndState(
      state: RecordsSliceType,
      action: GlobalActionType
    ) {
      state.income = action.payload.income;
      state.expense = action.payload.expense;
      state.total = action.payload.total;
      state.recordsData = action.payload.recordsData;
    },
  },
});

export const recordsActions = recordsSlice.actions;
export default recordsSlice;
