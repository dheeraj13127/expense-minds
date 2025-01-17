import { useSelector } from "react-redux";
import {
  RootState,
  StatisticsDataType,
  StatisticsInfoType,
} from "../../../../interfaces/Interfaces";

const StatisticsInfo = ({
  amountType,
  income,
  expense,
}: StatisticsInfoType) => {
  const statisticsData: StatisticsDataType[] = useSelector<
    RootState,
    StatisticsDataType[]
  >((state) => state.statistics.statisticsData);
  return (
    <div>
      <div className=" my-2 flex items-center justify-between p-3 border rounded">
        <p className="text-white font-poppins">Total</p>
        {amountType === "expense" ? (
          <p className="font-poppins text-orange-700 text-sm">
            $ {expense?.toFixed(2)}
          </p>
        ) : (
          <p className="font-poppins text-blue-500 text-sm">
            $ {income?.toFixed(2)}
          </p>
        )}
      </div>
      <div className=" space-y-2">
        {statisticsData.map((sd: StatisticsDataType, key: number) => (
          <div
            key={key}
            className="bg-black p-3 border border-white border-opacity-40 rounded-md flex items-center justify-between"
          >
            <div className=" flex space-x-4">
              <p className="text-black font-poppins text-xs w-16 bg-white flex font-medium items-center justify-center px-2  rounded">
                {sd.percentage.toFixed(2)}%
              </p>
              <p className="text-white font-poppins text-sm">{sd._id}</p>
            </div>
            <div>
              {amountType === "expense" ? (
                <p className="font-poppins text-orange-700 text-sm">
                  $ {sd.expense.toFixed(2)}
                </p>
              ) : (
                <p className="font-poppins text-blue-500 text-sm">
                  $ {sd.income.toFixed(2)}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatisticsInfo;
