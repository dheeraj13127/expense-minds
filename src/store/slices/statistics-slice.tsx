import { createSlice, Slice } from "@reduxjs/toolkit";
import {
  GlobalActionType,
  StatisticsSliceType,
} from "../../interfaces/Interfaces";

const statisticsSlice: Slice = createSlice({
  name: "statistics",
  initialState: {
    income: 0,
    expense: 0,
    statisticsData: [],
    labels: [],
    percentages: [],
  },

  reducers: {
    setStatisticsDataAndState(
      state: StatisticsSliceType,
      action: GlobalActionType
    ) {
      state.income = action.payload.income;
      state.expense = action.payload.expense;
      state.statisticsData = action.payload.statisticsData;
      state.labels = action.payload.labels;
      state.percentages = action.payload.percentages;
    },
    updateStatisticsDataAndState(
      state: StatisticsSliceType,
      action: GlobalActionType
    ) {
      state.income = action.payload.income;
      state.expense = action.payload.expense;
      state.statisticsData = action.payload.statisticsData;
      state.labels = action.payload.labels;
      state.percentages = action.payload.percentages;
    },
  },
});

export const statisticsActions = statisticsSlice.actions;
export default statisticsSlice;
