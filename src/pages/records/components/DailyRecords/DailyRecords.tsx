import { useState } from "react";
import FilterBar from "../FilterBar/FilterBar";
import StatsBar from "../StatsBar/StatsBar";
import CalenderBar from "../../../../components/CalenderBar/CalenderBar";

const DailyRecords = () => {
  const [income, setIncome] = useState<number>(0.0);
  const [expense, setExpense] = useState<number>(0.0);
  const [total, setTotal] = useState<number>(0.0);

  return (
    <div>
      <div className="col-span-12">
        <FilterBar />
        <CalenderBar monthsView={true} daysView={false} />
        <StatsBar income={income} expense={expense} total={total} />
      </div>
    </div>
  );
};

export default DailyRecords;
