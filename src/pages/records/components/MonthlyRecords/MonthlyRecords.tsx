import { useCallback, useEffect, useState } from "react";
import FilterBar from "../FilterBar/FilterBar";
import StatsBar from "../StatsBar/StatsBar";
import CalenderBar from "../../../../components/CalenderBar/CalenderBar";
import dayjs from "dayjs";
import axios from "axios";
import {
  getRecordsByMonthURL,
  processRecordsByMonthlySummaryURL,
} from "../../../../url/URL";
import { RecordsDataType, RootState } from "../../../../interfaces/Interfaces";
import IndividualRecords from "./components/IndividualRecords/IndividualRecords";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { recordsActions } from "../../../../store/slices/records-slice";
import UpdateRecord from "../UpdateRecord/UpdateRecord";
import SummaryBar from "../SummaryBar/SummaryBar";

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
  const [showUpdateModal, setShowUpdateModal] = useState<boolean>(false);
  const dispatch = useDispatch();
  const fetchedRecordsByMonthlySummary: boolean = useSelector<
    RootState,
    boolean
  >((state) => state.records.fetchedRecordsByMonthlySummary);

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
        income: data ? data.totalIncomeSum : 0,
        expense: data ? data.totalExpenseSum : 0,
        total: data ? data.netTotal : 0,
        recordsData: data ? data.data : [],
      })
    );
    if (!fetchedRecordsByMonthlySummary) {
      const recordsSummary = await axios.post(
        processRecordsByMonthlySummaryURL,
        {
          data: {
            recordsByMonth: data,
          },
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      dispatch(
        recordsActions.setRecordsSummary({
          recordsSummary: recordsSummary.data.summary,
        })
      );
      dispatch(
        recordsActions.setFetchedRecordsByMonthlySummary({
          fetchedSummary: true,
        })
      );
      dispatch(
        recordsActions.setFetchedRecordsByDaySummary({
          fetchedSummary: false,
        })
      );
    }
  }, [token, dispatch, fetchedRecordsByMonthlySummary]);
  useEffect(() => {
    fetchRecordsByMonth();
  }, [fetchRecordsByMonth]);

  const handleFetchNewRecords = async () => {
    try {
      dispatch(
        recordsActions.setRecordsSummary({
          recordsSummary: "",
        })
      );
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
        const recordsSummary = await axios.post(
          processRecordsByMonthlySummaryURL,
          {
            data: {
              recordsByMonth: newData,
            },
          },
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );
        dispatch(
          recordsActions.setRecordsSummary({
            recordsSummary: recordsSummary.data.summary,
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
          showArrows={true}
        />
        <StatsBar income={income} expense={expense} total={total} />
        {recordsData.length > 0 && <SummaryBar />}
        {showUpdateModal && (
          <UpdateRecord
            setShowUpdateModal={setShowUpdateModal}
            recordType="monthly"
          />
        )}
        {recordsData && recordsData.length > 0 ? (
          <div className="my-10 space-y-10">
            {recordsData.map((rd: RecordsDataType["data"][0], key: number) => (
              <div key={key}>
                <IndividualRecords
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

export default MonthlyRecords;
