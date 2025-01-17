import { useEffect, useMemo, useState } from "react";
import { FilterBarDataType } from "../../../../interfaces/Interfaces";
import { matchPath, useLocation, useNavigate } from "react-router-dom";

const FilterBar = () => {
  const { pathname } = useLocation();
  const [activeTab, setActiveTab] = useState<string>("records");
  const navigate = useNavigate();
  const routes = useMemo(
    () => ["/dashboard/statistics/monthly", "/dashboard/statistics/yearly"],
    []
  );

  const filterBarData: FilterBarDataType[] = [
    { id: 1, name: "monthly", url: "/dashboard/statistics/monthly" },
    { id: 2, name: "yearly", url: "/dashboard/statistics/yearly" },
  ];
  useEffect(() => {
    const matchedRoute = routes.find((el: string) => matchPath(el, pathname));
    if (matchedRoute === "/dashboard/statistics/monthly") {
      setActiveTab("monthly");
    } else if (matchedRoute === "/dashboard/statistics/yearly") {
      setActiveTab("yearly");
    }
  }, [pathname, routes]);

  const handleSetFilter = (value: FilterBarDataType) => {
    navigate(value.url);
    setActiveTab(value.name);
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
