import { StatsBarType } from "../../../../interfaces/Interfaces";

const StatsBar = ({ income, expense, total }: StatsBarType) => {
  return (
    <div className="bg-zinc-700 flex items-center justify-around px-1 py-2 rounde">
      <div className=" flex items-center flex-col">
        <p className="text-white font-inter font-medium text-base sm:text-lg">
          Income
        </p>
        <p className="text-orange-700 text-sm sm:text-base">
          {income.toFixed(2)}
        </p>
      </div>
      <div className=" flex items-center flex-col">
        <p className="text-white font-inter font-medium text-base sm:text-lg">
          Expenses
        </p>
        <p className="text-blue-500 text-sm sm:text-base">
          {expense.toFixed(2)}
        </p>
      </div>
      <div className=" flex items-center flex-col">
        <p className="text-white font-inter font-medium text-base sm:text-lg">
          Total
        </p>
        <p className="text-white text-sm sm:text-base">{total.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default StatsBar;
