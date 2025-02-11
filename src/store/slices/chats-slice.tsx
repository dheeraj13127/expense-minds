import { createSlice, Slice } from "@reduxjs/toolkit";
import { ChatSliceType, GlobalActionType } from "../../interfaces/Interfaces";

const chatSlice: Slice = createSlice({
  name: "chat",
  initialState: {
    widgetActive: false,
    animationActive: false,
  },

  reducers: {
    setWidgetActive(state: ChatSliceType, action: GlobalActionType) {
      state.widgetActive = action.payload.widgetActive;
    },
    setAnimationActive(state: ChatSliceType, action: GlobalActionType) {
      state.animationActive = action.payload.animationActive;
    },
  },
});

export const chatActions = chatSlice.actions;
export default chatSlice;
