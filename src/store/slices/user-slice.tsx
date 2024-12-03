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
  },
  reducers: {
    setUserData(state: UserSliceStateType, action: GlobalActionType) {
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.id = action.payload.id;
      state.token = action.payload.token;
    },
  },
});

export const userActions = userSlice.actions;
export default userSlice;
