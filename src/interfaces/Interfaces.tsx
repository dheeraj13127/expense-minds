import { ReactNode } from "react";

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
  user: UserSliceStateType;
}

export interface SidebarSubMenuItems {
  name: string;
  url: string;
  icon: ReactNode;
}

export interface SideBarMenuItemsType {
  name: string;
  url: string;
  icon: ReactNode;
  items: SidebarSubMenuItems[];
}
