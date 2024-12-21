import { useMemo } from "react";
import {
  FilterBarDataType,
  FilterBarType,
} from "../../../../interfaces/Interfaces";

const FilterBar = ({ setFilter }: FilterBarType) => {
  const routes = useMemo(
    () => [
      "/dashboard/records/daily",
      "/dashboard/records/monthly",
      "/dashboard/records/calendar",
      "/dashboard/records/summary",
    ],
    []
  );

  const filterBarData: FilterBarDataType[] = [
    { id: 1, name: "Daily", value: "daily" },
    { id: 1, name: "Monthly", value: "monthly" },
    { id: 1, name: "Calendar", value: "calendar" },
    { id: 1, name: "Summary", value: "summary" },
  ];
  const handleSetFilter = (value: string) => {
    setFilter(value);
  };
  return (
    <div className="bg-black px-2 pt-2 flex items-center justify-around space-x-6">
      {filterBarData.map((fil: FilterBarDataType, key: number) => (
        <div
          key={key}
          onClick={() => handleSetFilter(fil.value)}
          className="w-full text-center"
        >
          <p className="text-white border-b-4 py-2 border-primary-green duration-300">
            {fil.name}
          </p>
        </div>
      ))}
    </div>
  );
};

export default FilterBar;
