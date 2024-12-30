import { useSelector } from "react-redux";
import {
  IndividualRecordType,
  RootState,
  UserSliceStateType,
} from "../../../../../../interfaces/Interfaces";
const SummaryDetails = ({ rdData }: IndividualRecordType) => {
  const userDetails = useSelector<RootState, UserSliceStateType>(
    (state) => state.user
  );
  return (
    <div>
      <div className="bg-black rounded py-3 border-4 border-white border-opacity-50">
        <div className="px-3 flex items-center justify-between py-2">
          <p className="text-white font-inter text-xs rounded px-1 py-0.5 bg-primary-green">
            {rdData._id}
          </p>
          <div className="flex items-center justify-end space-x-10 ">
            <p className="text-blue-500 text-xs font-inter">
              {userDetails && userDetails.currency.symbol}{" "}
              {rdData.expense.toFixed(2)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SummaryDetails;
