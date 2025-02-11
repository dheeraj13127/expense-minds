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
    toBeUpdatedRecord: {
      account: "",
      amount: 0,
      amountType: "",
      category: "",
      note: "",
      _id: "",
    },
    parentRecordId: "",
    recordsSummary: "",
    fetchedRecordsByDaySummary: false,
    fetchedRecordsByMonthlySummary: false,
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
    setToBeUpdatedRecord(state: RecordsSliceType, action: GlobalActionType) {
      state.toBeUpdatedRecord = action.payload.toBeUpdatedRecord;
    },
    setParentRecordId(state: RecordsSliceType, action: GlobalActionType) {
      state.parentRecordId = action.payload.parentRecordId;
    },
    updateRecordsData(state: RecordsSliceType, action: GlobalActionType) {
      const newRecord = action.payload.recordsData;
      state.income = action.payload.income;
      state.expense = action.payload.expense;
      state.total = action.payload.total;
      for (let i = 0; i < state.recordsData.length; i++) {
        if (state.recordsData[i]._id === newRecord._id) {
          state.recordsData[i] = newRecord;
        }
      }
    },
    deleteRecordsData(state: RecordsSliceType, action: GlobalActionType) {
      const newRecord = action.payload.recordsData;
      const parentRecordId = action.payload.parentRecordId;
      state.income = action.payload.income;
      state.expense = action.payload.expense;
      state.total = action.payload.total;
      if (newRecord.length > 0) {
        for (let i = 0; i < state.recordsData.length; i++) {
          if (state.recordsData[i]._id === newRecord[0]._id) {
            state.recordsData[i] = newRecord[0];
          }
        }
      } else {
        state.recordsData = state.recordsData.filter(
          (x) => x._id !== parentRecordId
        );
      }
    },
    setRecordsSummary(state: RecordsSliceType, action: GlobalActionType) {
      state.recordsSummary = action.payload.recordsSummary;
    },
    setFetchedRecordsByDaySummary(
      state: RecordsSliceType,
      action: GlobalActionType
    ) {
      state.fetchedRecordsByDaySummary = action.payload.fetchedSummary;
    },
    setFetchedRecordsByMonthlySummary(
      state: RecordsSliceType,
      action: GlobalActionType
    ) {
      state.fetchedRecordsByMonthlySummary = action.payload.fetchedSummary;
    },
  },
});

export const recordsActions = recordsSlice.actions;
export default recordsSlice;
