import { useCallback, useEffect, useState } from "react";
import FilterBar from "../FilterBar/FilterBar";
import StatsBar from "../StatsBar/StatsBar";
import CalenderBar from "../../../../components/CalenderBar/CalenderBar";
import dayjs from "dayjs";
import axios from "axios";
import { getRecordsByDayURL } from "../../../../url/URL";
import { RecordsDataType, RootState } from "../../../../interfaces/Interfaces";
import IndividualRecord from "./components/IndividualRecors/IndividualRecord";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { recordsActions } from "../../../../store/slices/records-slice";
import UpdateRecord from "../UpdateRecord/UpdateRecord";

const DailyRecords = () => {
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
  const [showUpdateModal, setShowUpdateModal] = useState<boolean>(false);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (showUpdateModal) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [showUpdateModal]);

  const fetchRecordsByDay = useCallback(async () => {
    const recordsData = await axios.get(
      `${getRecordsByDayURL}?day=${dayjs().year()}-${dayjs().month() + 1}`,
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
    fetchRecordsByDay();
  }, [fetchRecordsByDay]);

  const handleFetchNewRecords = async () => {
    try {
      const data = result.year() + "-" + (result.month() + 1);
      const recordsData = await axios.get(`${getRecordsByDayURL}?day=${data}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
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
      <div className="col-span-12 relative">
        <FilterBar />
        <CalenderBar
          calView="months"
          monthsView={true}
          daysView={false}
          result={result}
          setResult={setResult}
          handleFetchNewRecords={handleFetchNewRecords}
        />
        <StatsBar income={income} expense={expense} total={total} />
        {showUpdateModal && (
          <UpdateRecord setShowUpdateModal={setShowUpdateModal} />
        )}
        {recordsData && recordsData.length > 0 ? (
          <div className="my-10 space-y-10">
            {recordsData.map((rd: RecordsDataType["data"][0], key: number) => (
              <div key={key}>
                <IndividualRecord
                  setShowUpdateModal={setShowUpdateModal}
                  rdData={rd}
                />
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

export default DailyRecords;
