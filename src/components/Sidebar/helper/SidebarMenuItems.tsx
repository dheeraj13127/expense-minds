import { SideBarMenuItemsType } from "../../../interfaces/Interfaces";
import { FaChartPie } from "react-icons/fa";
import { BsCollectionFill } from "react-icons/bs";
import { GrTransaction } from "react-icons/gr";
import { FaCalculator } from "react-icons/fa6";
import { IoSettingsSharp } from "react-icons/io5";
import { MdCategory, MdOutlineAccountBalanceWallet } from "react-icons/md";

export const sideBarMenuItems: SideBarMenuItemsType[] = [
  {
    name: "records",
    url: "/dashboard/records/daily",
    icon: <BsCollectionFill />,
    items: [],
  },
  {
    name: "transactions",
    url: "/dashboard/transactions",
    icon: <GrTransaction />,
    items: [],
  },
  {
    name: "statistics",
    url: "/dashboard/statistics/monthly",
    icon: <FaChartPie />,
    items: [],
  },

  {
    name: "tools",
    url: "/dashboard/tools",
    icon: <FaCalculator />,
    items: [],
  },
  {
    name: "settings",
    url: "/dashboard/settings/categories",
    icon: <IoSettingsSharp />,
    items: [
      {
        name: "categories",
        url: "/dashboard/settings/categories",
        icon: <MdCategory />,
      },
      {
        name: "accounts",
        url: "/dashboard/settings/accounts",
        icon: <MdOutlineAccountBalanceWallet />,
      },
    ],
  },
];
