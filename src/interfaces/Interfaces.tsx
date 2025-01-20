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
  setResult: React.Dispatch<React.SetStateAction<dayjs.Dayjs>>;
  result: dayjs.Dayjs;
  handleFetchNewRecords: () => void;
  calView: string;
}
export interface CalendarType {
  calView: string;
  daysView: boolean;
  monthsView: boolean;
  setResult: React.Dispatch<React.SetStateAction<dayjs.Dayjs>>;
  result: dayjs.Dayjs;
  setShowCalendar: React.Dispatch<React.SetStateAction<boolean>>;
  setMonthsActive?: React.Dispatch<React.SetStateAction<boolean>> | undefined;
  setYearsActive?: React.Dispatch<React.SetStateAction<boolean>> | undefined;
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
    expense: {
      categoryName: string;
      categorySymbol: string;
      _id: string;
    }[];
    income: {
      categoryName: string;
      categorySymbol: string;
      _id: string;
    }[];
  };
  currency: {
    country: string;
    name: string;
    symbol: string;
    _id: string;
  };
  toBeUpdatedCategory: {
    _id: string;
    categoryName: string;
    categorySymbol: string;
  };
}

export interface RecordsSliceType {
  income: number;
  expense: number;
  total: number;
  recordsData: RecordsDataType["data"];
  toBeUpdatedRecord: RecordType;
  parentRecordId: string;
}

export interface RootState {
  user: UserSliceStateType;
  records: RecordsSliceType;
  statistics: StatisticsSliceType;
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

export interface StatisticsDataType {
  _id: string;
  expense: number;
  income: number;
  percentage: number;
}

export interface StatisticsType {
  totalExpenseSum: number;
  totalIncomeSum: number;
  data: StatisticsDataType[];
  labels: string[];
  percentages: string[];
}
export interface StatisticsSliceType {
  income: number;
  expense: number;
  statisticsData: StatisticsDataType[];
  labels: string[];
  percentages: number[];
}
export interface StatsBarType {
  income: number;
  expense: number;
  total: number;
}
export interface StatisticsStatsBarType {
  amountType: string;
  setAmountType: React.Dispatch<React.SetStateAction<string>>;
}

export interface FilterBarDataType {
  id: number;
  name: string;
  url: string;
}
export interface IndividualRecordType {
  rdData: RecordsDataType["data"][0];
  setShowUpdateModal?: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface UpdateRecordType {
  setShowUpdateModal: React.Dispatch<React.SetStateAction<boolean>>;
  recordType: string;
}

export interface DoughnutChartType {
  labels: string[];
  percentages: number[];
  amountType: string;
}

export interface StatisticsInfoType {
  amountType: string;
  income: number;
  expense: number;
}

export interface CreateCategoryModalType {
  setShowCreateModal: React.Dispatch<React.SetStateAction<boolean>>;
  categoryType: string;
}

export interface UpdateCategoryModalType {
  setShowUpdateModal: React.Dispatch<React.SetStateAction<boolean>>;
  categoryType: string;
}
