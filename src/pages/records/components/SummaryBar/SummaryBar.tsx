import { useSelector } from "react-redux";
import { RootState } from "../../../../interfaces/Interfaces";
import { ClipLoader } from "react-spinners";
const SummaryBar = () => {
  const summary: string = useSelector<RootState, string>(
    (state) => state.records.recordsSummary
  );

  return (
    <div className="bg-orange-800  rounded-t  border-opacity-50 px-2 py-2 flex items-center justify-around space-x-6">
      <div>
        <p className="text-white font-poppins text-center">Monthly summary</p>
        <p className="text-white text-[8px] text-opacity-80 font-poppins text-center">
          Powered by ExpenseMinds AI
        </p>
        {!summary ? (
          <div className=" flex justify-center py-8">
            <ClipLoader color="white" size={18} />
          </div>
        ) : (
          <p className="text-white text-sm font-inter text-opacity-80 mt-2">
            {summary}
          </p>
        )}
      </div>
    </div>
  );
};

export default SummaryBar;
