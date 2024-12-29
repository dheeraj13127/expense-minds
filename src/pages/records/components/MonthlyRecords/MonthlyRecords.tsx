import { useCallback, useEffect, useState } from "react";
import FilterBar from "../FilterBar/FilterBar";
import StatsBar from "../StatsBar/StatsBar";
import CalenderBar from "../../../../components/CalenderBar/CalenderBar";
import dayjs from "dayjs";
import axios from "axios";
import { getRecordsByMonthURL } from "../../../../url/URL";
import { RecordsDataType, RootState } from "../../../../interfaces/Interfaces";
import IndividualRecords from "./components/IndividualRecords/IndividualRecords";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { recordsActions } from "../../../../store/slices/records-slice";

const MonthlyRecords = () => {
  const income: number = useSelector<RootState, number>(
    (state) => state.records.income
  );
  const expense: number = useSelector<RootState, number>(
    (state) => state.records.expense
  );
  const total: number = useSelector<RootState, number>(
    (state) => state.records.total
  );
  const recordsData: RecordsDataType["data"] = useSelector<
    RootState,
    RecordsDataType["data"]
  >((state) => state.records.recordsData);

  const dispatch = useDispatch();
  const [result, setResult] = useState<dayjs.Dayjs>(dayjs());
  const token = localStorage.getItem("token");
  const fetchRecordsByMonth = useCallback(async () => {
    const recordsData = await axios.get(
      `${getRecordsByMonthURL}?month=${dayjs().year()}`,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );

    const data = recordsData.data.result[0];

    dispatch(
      recordsActions.setRecordsDataAndState({
        income: data.totalIncomeSum,
        expense: data.totalExpenseSum,
        total: data.netTotal,
        recordsData: data.data,
      })
    );
  }, [token, dispatch]);
  useEffect(() => {
    fetchRecordsByMonth();
  }, [fetchRecordsByMonth]);

  const handleFetchNewRecords = async () => {
    try {
      const data = result.year();
      const recordsData = await axios.get(
        `${getRecordsByMonthURL}?month=${data}`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      const newData = recordsData.data.result[0];
      if (newData === undefined) {
        dispatch(
          recordsActions.updateRecordsDataAndState({
            income: 0,
            expense: 0,
            total: 0,
            recordsData: [],
          })
        );
      } else {
        dispatch(
          recordsActions.updateRecordsDataAndState({
            income: newData.totalIncomeSum,
            expense: newData.totalExpenseSum,
            total: newData.netTotal,
            recordsData: newData.data,
          })
        );
      }
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong !");
    }
  };
  return (
    <div className="">
      <div className="col-span-12">
        <FilterBar />
        <CalenderBar
          calView="years"
          monthsView={false}
          daysView={false}
          result={result}
          setResult={setResult}
          handleFetchNewRecords={handleFetchNewRecords}
        />
        <StatsBar income={income} expense={expense} total={total} />
        {recordsData && recordsData.length > 0 ? (
          <div className="my-10 space-y-10">
            {recordsData.map((rd: RecordsDataType["data"][0], key: number) => (
              <div key={key}>
                <IndividualRecords rdData={rd} />
              </div>
            ))}
          </div>
        ) : (
          <div className="flex h-screen">
            <p className="text-white mx-auto my-52 font-poppins text-xl">
              No records found
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MonthlyRecords;
