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
  accounts: {
    groupName: string;
    subAccounts: [
      {
        amount: number;
        description: string;
        name: string;
        _id: string;
      }
    ];
    _id: string;
  }[];
  categories: {
    categoryName: string;
    categorySymbol: string;
    _id: string;
  }[];
  currency: {
    country: string;
    name: string;
    symbol: string;
    _id: string;
  };
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
