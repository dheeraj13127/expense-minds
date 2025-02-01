import CalenderBar from "../../../../components/CalenderBar/CalenderBar";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../interfaces/Interfaces";
import { statisticsActions } from "../../../../store/slices/statistics-slice";
import { getStatisticsYearlyURL } from "../../../../url/URL";
import StatisticsStatsBar from "../.././components/StatisticsStatsBar/StatisticsStatsBar";
import toast from "react-hot-toast";
import DoughnutChart from "../DoughnutChart/DoughnutChart";
import FilterBar from "../FilterBar/FilterBar";
import StatisticsInfo from "../StatisticsInfo/StatisticsInfo";

const StatisticsYearly = () => {
  const token = localStorage.getItem("token");
  const [result, setResult] = useState<dayjs.Dayjs>(dayjs());
  const [amountType, setAmountType] = useState<string>("expense");
  const income: number = useSelector<RootState, number>(
    (state) => state.statistics.income
  );
  const expense: number = useSelector<RootState, number>(
    (state) => state.statistics.expense
  );
  const labels: string[] = useSelector<RootState, string[]>(
    (state) => state.statistics.labels
  );
  const percentages: number[] = useSelector<RootState, number[]>(
    (state) => state.statistics.percentages
  );

  const dispatch = useDispatch();

  const fetchStatisticsMonthly = useCallback(async () => {
    const statisticsData = await axios.get(
      `${getStatisticsYearlyURL}?year=${result.year()}&amountType=${amountType}`,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );

    const data = statisticsData.data.result[0];

    dispatch(
      statisticsActions.setStatisticsDataAndState({
        income: data ? data.totalIncomeSum : 0,
        expense: data ? data.totalExpenseSum : 0,
        statisticsData: data ? data.data : [],
        labels: data ? data.labels : [],
        percentages: data ? data.percentages : [],
      })
    );
  }, [token, dispatch, amountType, result]);
  useEffect(() => {
    fetchStatisticsMonthly();
  }, [fetchStatisticsMonthly]);

  const handleFetchNewStatisticsData = async () => {
    try {
      const data = result.year();
      const recordsData = await axios.get(
        `${getStatisticsYearlyURL}?year=${data}&amountType=${amountType}`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      const newData = recordsData.data.result[0];
      if (newData === undefined) {
        dispatch(
          statisticsActions.updateStatisticsDataAndState({
            income: 0,
            expense: 0,
            statisticsData: [],
            labels: [],
            percentages: [],
          })
        );
      } else {
        dispatch(
          statisticsActions.updateStatisticsDataAndState({
            income: newData.totalIncomeSum,
            expense: newData.totalExpenseSum,
            statisticsData: newData.data,
            labels: newData.labels,
            percentages: newData.percentages,
          })
        );
      }
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong !");
    }
  };

  return (
    <div className="grid grid-cols-12 ">
      <div className="col-span-12 h-fit">
        <FilterBar />
        <CalenderBar
          calView="years"
          monthsView={false}
          daysView={false}
          result={result}
          setResult={setResult}
          handleFetchNewRecords={handleFetchNewStatisticsData}
          showArrows={true}
        />
        <StatisticsStatsBar
          amountType={amountType}
          setAmountType={setAmountType}
        />
        {labels.length === 0 || percentages.length === 0 ? (
          <div className="flex h-screen">
            <p className="text-white mx-auto my-52 font-poppins text-xl">
              No Data found
            </p>
          </div>
        ) : (
          <div>
            <div className=" max-w-lg my-10 mx-auto">
              <DoughnutChart
                labels={labels}
                percentages={percentages}
                amountType={amountType}
              />
            </div>
            <StatisticsInfo
              amountType={amountType}
              income={income}
              expense={expense}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default StatisticsYearly;
