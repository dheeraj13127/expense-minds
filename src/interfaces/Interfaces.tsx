export interface GlobalActionType {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  payload: any;
  type: string;
}

export interface UserSliceStateType {
  name: string;
  email: string;
  id: string;
  token: string;
}

export interface RootState {
  plan: UserSliceStateType;
}
