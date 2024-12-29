import { useSelector } from "react-redux";
import {
  IndividualRecordType,
  RecordType,
  RootState,
  UserSliceStateType,
} from "../../../../../../interfaces/Interfaces";
import { monthsData } from "../helper/MonthsData";
const IndividualRecords = ({ rdData }: IndividualRecordType) => {
  const userDetails = useSelector<RootState, UserSliceStateType>(
    (state) => state.user
  );
  return (
    <div>
      <div className="bg-black rounded py-3">
        <div className="px-3 flex items-center justify-between border-b-2 border-white border-opacity-20 py-2">
          <p className="text-white font-inter text-xs rounded px-1 py-0.5 bg-primary-green">
            {monthsData[rdData._id.toString()]}
          </p>
          <div className="flex items-center justify-end space-x-10 ">
            <p className="text-orange-700 text-xs text-left font-inter">
              {userDetails && userDetails.currency.symbol}{" "}
              {rdData.income.toFixed(2)}
            </p>
            <p className="text-blue-500 text-xs font-inter">
              {userDetails && userDetails.currency.symbol}{" "}
              {rdData.expense.toFixed(2)}
            </p>
          </div>
        </div>
        <div className="">
          {rdData?.records.length > 0 ? (
            <div className="my-5 px-3 space-y-5">
              {rdData.records.map((record: RecordType, key: number) => (
                <div
                  key={key}
                  className=" hover:bg-zinc-800 p-1 cursor-pointer duration-100 rounded"
                >
                  <div className="grid grid-cols-4">
                    <p className="text-gray-300 text-xs sm:text-sm font-poppins">
                      {record.category}
                    </p>
                    <p className="text-gray-300 capitalize col-span-2 sm:col-span-1  text-xs sm:text-sm font-poppins justify-self-center sm:justify-self-start">
                      {record.account}
                    </p>
                    <p
                      className={`${
                        record.amountType === "expense"
                          ? "text-blue-500"
                          : " text-orange-700"
                      }  text-xs sm:text-sm font-poppins sm:col-span-2 justify-self-end`}
                    >
                      {userDetails && userDetails.currency.symbol}{" "}
                      {record.amount.toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div>
              <p className="text-white font-poppins text-xs sm:text-sm text-center my-3">
                No data found
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default IndividualRecords;
