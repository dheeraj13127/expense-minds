import dayjs from "dayjs";
import { ReactNode } from "react";

export interface GlobalActionType {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  payload: any;
  type: string;
}

export interface CalendarBarType {
  daysView: boolean;
  monthsView: boolean;
}
export interface CalendarType {
  calView: string;
  daysView: boolean;
  monthsView: boolean;
  setResult: React.Dispatch<React.SetStateAction<dayjs.Dayjs>>;
  result: dayjs.Dayjs;
  setShowCalendar: React.Dispatch<React.SetStateAction<boolean>>;
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

export interface RecordType {
  account: string;
  amount: number;
  amountType: string;
  category: string;
  note: string;
  _id: string;
}
export interface RecordsDataType {
  totalExpenseSum: number;
  totalIncomeSum: number;
  netTotal: number;
  data: {
    _id: string;
    expense: number;
    income: number;
    records: {
      _id: string;
      amount: number;
      category: string;
      amountType: string;
      account: string;
      note: string;
    }[];
  }[];
}

export interface StatsBarType {
  income: number;
  expense: number;
  total: number;
}

export interface FilterBarDataType {
  id: number;
  name: string;
  url: string;
}
