import { useEffect, useMemo, useState } from "react";
import { FilterBarDataType } from "../../../../interfaces/Interfaces";
import { matchPath, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { recordsActions } from "../../../../store/slices/records-slice";

const FilterBar = () => {
  const { pathname } = useLocation();
  const [activeTab, setActiveTab] = useState<string>("records");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const routes = useMemo(
    () => [
      "/dashboard/records/daily",
      "/dashboard/records/monthly",
      "/dashboard/records/summary",
    ],
    []
  );

  const filterBarData: FilterBarDataType[] = [
    { id: 1, name: "daily", url: "/dashboard/records/daily" },
    { id: 2, name: "monthly", url: "/dashboard/records/monthly" },
    { id: 3, name: "summary", url: "/dashboard/records/summary" },
  ];
  useEffect(() => {
    const matchedRoute = routes.find((el: string) => matchPath(el, pathname));
    if (matchedRoute === "/dashboard/records/daily") {
      setActiveTab("daily");
    } else if (matchedRoute === "/dashboard/records/monthly") {
      setActiveTab("monthly");
    } else if (matchedRoute === "/dashboard/records/summary") {
      setActiveTab("summary");
    }
  }, [pathname, routes]);

  const handleSetFilter = (value: FilterBarDataType) => {
    navigate(value.url);
    setActiveTab(value.name);
    dispatch(
      recordsActions.setRecordsSummary({
        recordsSummary: "",
      })
    );
  };
  return (
    <div className="bg-black border-b rounded-t border-white border-opacity-50 px-2 pt-2 flex items-center justify-around space-x-6">
      {filterBarData.map((fil: FilterBarDataType, key: number) => (
        <div
          key={key}
          onClick={() => handleSetFilter(fil)}
          className="w-full text-center cursor-pointer"
        >
          <p
            className={`text-white font-inter border-b-4 py-2 capitalize ${
              activeTab === fil.name ? "border-white" : "border-transparent"
            }  duration-300`}
          >
            {fil.name}
          </p>
        </div>
      ))}
    </div>
  );
};

export default FilterBar;
