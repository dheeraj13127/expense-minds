/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useMemo, useRef, useState } from "react";
import sidebarLogo from "../../assets/em_new_logo.png";
import { MdOutlineSubject } from "react-icons/md";
import { IoMdChatbubbles } from "react-icons/io";
import {
  matchPath,
  NavigateFunction,
  useLocation,
  useNavigate,
} from "react-router-dom";
import {
  RootState,
  SideBarMenuItemsType,
  SidebarSubMenuItems,
} from "../../interfaces/Interfaces";
import { sideBarMenuItems } from "./helper/SidebarMenuItems";
import { PiSignOutBold } from "react-icons/pi";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { chatActions } from "../../store/slices/chats-slice";
import { ClipLoader } from "react-spinners";
import { recordsActions } from "../../store/slices/records-slice";
const Sidebar = ({ children }: any) => {
  const sidebarRef = useRef<any>();
  const dispatch = useDispatch();
  const [navActive, setNavActive] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>("about");
  const [activeSubTab, setActiveSubTab] = useState<string>("");
  const { pathname } = useLocation();
  const navigate: NavigateFunction = useNavigate();
  const user = useSelector<RootState, any>((state) => state.user);

  const routes = useMemo(
    () => [
      "/dashboard/records/daily",
      "/dashboard/records/monthly",
      "/dashboard/records/summary",
      "/dashboard/transactions",
      "/dashboard/statistics/monthly",
      "/dashboard/statistics/yearly",
      "/dashboard/tools",
      "/dashboard/settings/categories",
      "/dashboard/settings/accounts",
    ],
    []
  );
  const handleClickOutsideSidebar = (event: any) => {
    if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
      setNavActive(false);
    }
  };
  useEffect(() => {
    document.addEventListener("click", handleClickOutsideSidebar, true);
    return () => {
      document.removeEventListener("click", handleClickOutsideSidebar, true);
    };
  }, []);

  useEffect(() => {
    const matchedRoute = routes.find((el: string) => matchPath(el, pathname));
    if (matchedRoute === "/dashboard/records/daily") {
      setActiveTab("records");
      setActiveSubTab("");
    } else if (matchedRoute === "/dashboard/records/monthly") {
      setActiveTab("records");
      setActiveSubTab("");
    } else if (matchedRoute === "/dashboard/records/summary") {
      setActiveTab("records");
      setActiveSubTab("");
    } else if (matchedRoute === "/dashboard/transactions") {
      setActiveTab("transactions");
      setActiveSubTab("");
    } else if (matchedRoute === "/dashboard/statistics/monthly") {
      setActiveTab("statistics");
      setActiveSubTab("");
    } else if (matchedRoute === "/dashboard/statistics/yearly") {
      setActiveTab("statistics");
      setActiveSubTab("");
    } else if (matchedRoute === "/dashboard/tools") {
      setActiveTab("tools");
      setActiveSubTab("");
    } else if (matchedRoute === "/dashboard/settings/categories") {
      setActiveTab("settings");
      setActiveSubTab("categories");
    } else if (matchedRoute === "/dashboard/settings/accounts") {
      setActiveTab("settings");
      setActiveSubTab("accounts");
    }
  }, [pathname, routes]);

  const handleNavigate = (item: SideBarMenuItemsType): void => {
    setNavActive(false);
    navigate(item.url);
    setActiveTab(item.name);
    dispatch(
      chatActions.setAnimationActive({
        animationActive: false,
      })
    );
    dispatch(
      chatActions.setWidgetActive({
        widgetActive: false,
      })
    );
  };

  const handleNavigateSubMenu = (
    item: SidebarSubMenuItems,
    parent: SideBarMenuItemsType
  ): void => {
    setNavActive(false);
    navigate(item.url);
    setActiveTab(parent.name);
    setActiveSubTab(item.name);
    dispatch(
      chatActions.setAnimationActive({
        animationActive: false,
      })
    );
    dispatch(
      chatActions.setWidgetActive({
        widgetActive: false,
      })
    );
  };

  const handleActivateChat = () => {
    setNavActive(false);
    dispatch(
      chatActions.setAnimationActive({
        animationActive: true,
      })
    );
    dispatch(
      chatActions.setWidgetActive({
        widgetActive: true,
      })
    );
  };
  const handleSignOut = () => {
    localStorage.clear();
    dispatch(
      recordsActions.setRecordsSummary({
        recordsSummary: "",
      })
    );
    dispatch(
      recordsActions.setFetchedRecordsByMonthlySummary({
        fetchedSummary: false,
      })
    );
    dispatch(
      recordsActions.setFetchedRecordsByDaySummary({
        fetchedSummary: false,
      })
    );
    toast.success("Signed out");
    navigate("/");
  };
  return (
    <div className="">
      <button
        onClick={() => setNavActive(true)}
        className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-white text-opacity-60"
      >
        <MdOutlineSubject size={24} />
      </button>

      <aside
        ref={sidebarRef}
        className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform ${
          navActive ? "translate-x-0" : "-translate-x-full"
        } sm:translate-x-0`}
      >
        <div className="h-full p-4 overflow-y-auto bg-orange-800 flex flex-col justify-between ">
          <div className="">
            <div className="flex items-center justify-center ">
              <img
                src={sidebarLogo}
                alt="logo"
                className=" w-40 p-1 rounded-xl"
              />
            </div>

            <ul className="space-y-4 mt-10 font-medium">
              {sideBarMenuItems.map((sm: SideBarMenuItemsType, key: number) => (
                <li
                  onClick={() => handleNavigate(sm)}
                  key={key}
                  className={`flex flex-col items-start ${
                    sm.name === activeTab
                      ? "bg-white bg-opacity-30"
                      : " bg-transparent"
                  }  px-2 py-2  rounded-lg cursor-pointer`}
                >
                  <div className=" flex items-center">
                    <span
                      className={` text-white ${
                        sm.name === activeTab
                          ? "text-opacity-100"
                          : "text-opacity-100"
                      }`}
                    >
                      {sm.icon}
                    </span>
                    <p
                      className={`flex items-center font-inter text-white  ${
                        sm.name === activeTab
                          ? "text-opacity-100"
                          : "text-opacity-100"
                      } font-normal text-base capitalize ms-3`}
                    >
                      {sm.name}
                    </p>
                  </div>
                  {activeTab === sm.name && sm.items.length > 0 && (
                    <ul className="ml-6 mt-2 ">
                      {sm.items.map((sbm: SidebarSubMenuItems, num: number) => (
                        <li
                          onClick={(e: React.MouseEvent<HTMLLIElement>) => {
                            e.stopPropagation();
                            handleNavigateSubMenu(sbm, sm);
                          }}
                          key={num}
                          className={`flex w-44 flex-col items-start ${
                            sbm.name === activeSubTab
                              ? " bg-opacity-50"
                              : " bg-transparent"
                          }  px-2 py-2  rounded-lg cursor-pointer`}
                        >
                          <div className=" flex items-center">
                            <span
                              className={` text-white ${
                                sbm.name === activeSubTab
                                  ? "text-opacity-100"
                                  : "text-opacity-70"
                              }`}
                            >
                              {sbm.icon}
                            </span>
                            <p
                              className={`flex items-center font-inter text-white  ${
                                sbm.name === activeSubTab
                                  ? "text-opacity-100"
                                  : "text-opacity-70"
                              } font-normal text-base capitalize ms-3`}
                            >
                              {sbm.name}
                            </p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-3">
            <div>
              <button
                onClick={handleActivateChat}
                className="text-white border flex items-center justify-center  font-inter w-full font-medium rounded-md text-sm bg-black px-2 py-3"
              >
                <span className="mr-2">
                  <IoMdChatbubbles size={16} />
                </span>
                Expy AI Chat
              </button>
            </div>
            <div className=" border-2 rounded-md p-1.5 flex flex-wrap  items-center justify-center space-x-2 cursor-pointer hover:bg-white hover:bg-opacity-30 duration-150">
              {user?.name ? (
                <>
                  <div className="h-7 w-7 rounded-full bg-black flex justify-center items-center">
                    <p className=" text-white">{user?.name[0]}</p>
                  </div>
                  <p className=" font-poppins text-white text-sm">
                    {user?.name}
                  </p>
                </>
              ) : (
                <ClipLoader color="#ffffff" size={27} />
              )}
            </div>
            <div>
              <button
                onClick={handleSignOut}
                className="text-black flex items-center justify-center  font-inter w-full font-medium rounded-md text-sm bg-white px-2 py-2"
              >
                <span className="mr-2">
                  <PiSignOutBold size={16} />
                </span>
                Sign out
              </button>
            </div>
          </div>
        </div>
      </aside>

      <div className="p-4 sm:ml-64 bg-zinc-800 sm:-mt-12">
        <div className=" ">{children}</div>
      </div>
    </div>
  );
};

export default Sidebar;
