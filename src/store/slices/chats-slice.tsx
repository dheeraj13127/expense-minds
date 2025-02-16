import { createSlice, Slice } from "@reduxjs/toolkit";
import { ChatSliceType, GlobalActionType } from "../../interfaces/Interfaces";

const chatSlice: Slice = createSlice({
  name: "chat",
  initialState: {
    widgetActive: false,
    animationActive: false,
    socket: null,
    conversation: null,
    messages: [],
    typing: false,
  },

  reducers: {
    setWidgetActive(state: ChatSliceType, action: GlobalActionType) {
      state.widgetActive = action.payload.widgetActive;
    },
    setAnimationActive(state: ChatSliceType, action: GlobalActionType) {
      state.animationActive = action.payload.animationActive;
    },
    setSocket(state: ChatSliceType, action: GlobalActionType) {
      state.socket = action.payload.socket;
    },
    setConversation(state: ChatSliceType, action: GlobalActionType) {
      state.conversation = action.payload.conversation;
    },
    addBulkMessages(state: ChatSliceType, action: GlobalActionType) {
      state.messages = action.payload.messages;
    },
    addMessage(state: ChatSliceType, action: GlobalActionType) {
      state.messages = [...state.messages, action.payload.message];
    },
    setTyping(state: ChatSliceType, action: GlobalActionType) {
      state.typing = action.payload.typing;
    },
  },
});

export const chatActions = chatSlice.actions;
export default chatSlice;
