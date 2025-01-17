import { StatisticsStatsBarType } from "../../../../interfaces/Interfaces";

const StatisticsStatsBar = ({
  setAmountType,
  amountType,
}: StatisticsStatsBarType) => {
  const handleClickAmountType = (amountType: string) => {
    setAmountType(amountType);
  };
  return (
    <div className="bg-zinc-700 flex items-center justify-around px-1 py-2 rounded-b space-x-4">
      <div
        onClick={() => handleClickAmountType("income")}
        className={` flex items-center flex-col cursor-pointer bg-gray-800 ${
          amountType === "income" ? "border-2 border-white" : ""
        } rounded py-2 w-full`}
      >
        <p className="text-white font-inter font-medium text-base ">Income</p>
      </div>
      <div
        onClick={() => handleClickAmountType("expense")}
        className={` flex items-center flex-col cursor-pointer bg-gray-800 ${
          amountType === "expense" ? "border-2 border-white" : ""
        } rounded py-2 w-full`}
      >
        <p className="text-white font-inter font-medium text-base ">Expenses</p>
      </div>
    </div>
  );
};

export default StatisticsStatsBar;
