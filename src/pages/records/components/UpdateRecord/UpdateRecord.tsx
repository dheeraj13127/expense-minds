import { IoCloseCircleSharp } from "react-icons/io5";
import {
  RecordType,
  RootState,
  UpdateRecordType,
  UserSliceStateType,
} from "../../../../interfaces/Interfaces";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import {
  deleteRecordURL,
  indexRecordsToPineURL,
  updateRecordURL,
} from "../../../../url/URL";
import toast from "react-hot-toast";
import { recordsActions } from "../../../../store/slices/records-slice";

const UpdateRecord = ({ setShowUpdateModal, recordType }: UpdateRecordType) => {
  const userDetails = useSelector<RootState, UserSliceStateType>(
    (state) => state.user
  );
  const toBeUpdatedRecord: RecordType = useSelector<RootState, RecordType>(
    (state) => state.records.toBeUpdatedRecord
  );
  const parentRecordId: string = useSelector<RootState, string>(
    (state) => state.records.parentRecordId
  );

  const [amount, setAmount] = useState<string>(
    toBeUpdatedRecord?.amount.toString()
  );
  const [amountType, setAmountType] = useState<string>(
    toBeUpdatedRecord?.amountType
  );
  const [category, setCategory] = useState<string>(toBeUpdatedRecord?.category);
  const [account, setAccount] = useState<string>(toBeUpdatedRecord?.account);
  const [note, setNote] = useState<string>(toBeUpdatedRecord?.note);
  const [error, setError] = useState<boolean>(false);
  const dispatch = useDispatch();
  const handleCloseModal = () => {
    setShowUpdateModal(false);
  };
  const handleSetAmountType = (data: string) => {
    setAmountType(data);
  };
  const handleSetCategory = (data: string) => {
    setCategory(data);
  };
  const handleSetAccount = (data: string) => {
    setAccount(data);
  };
  const handleUpdate = async () => {
    if (amount === "" || category === "" || account === "") {
      setError(true);
    } else {
      setError(false);
      const data = {
        _id: toBeUpdatedRecord._id,
        amount,
        category,
        amountType: amountType.toLocaleLowerCase(),
        account,
        note,
        recordType,
      };
      try {
        const res = await axios.put(
          updateRecordURL,
          {
            data: data,
          },
          {
            headers: {
              Authorization: "Bearer " + userDetails.token,
            },
          }
        );
        setShowUpdateModal(false);
        const result = res.data.records;

        dispatch(
          recordsActions.updateRecordsData({
            income: result.totalIncomeSum,
            expense: result.totalExpenseSum,
            total: result.netTotal,
            recordsData: result.data[0],
          })
        );
        toast.success("Updated successfully !");
        await axios.post(
          indexRecordsToPineURL,
          { data: {} },
          {
            headers: {
              Authorization: "Bearer " + userDetails.token,
            },
          }
        );
      } catch (err) {
        console.log(err);
        toast.error("Something went wrong !");
      }
    }
  };
  const handleDelete = async () => {
    try {
      const res = await axios.delete(
        `${deleteRecordURL}?id=${toBeUpdatedRecord._id}&recordType=${recordType}`,
        {
          headers: {
            Authorization: "Bearer " + userDetails.token,
          },
        }
      );
      setShowUpdateModal(false);
      const result = res.data.records;

      dispatch(
        recordsActions.deleteRecordsData({
          income: result.totalIncomeSum,
          expense: result.totalExpenseSum,
          total: result.netTotal,
          recordsData: result.data,
          parentRecordId: parentRecordId,
        })
      );
      toast.success("Deleted successfully !");
      await axios.post(
        indexRecordsToPineURL,
        { data: {} },
        {
          headers: {
            Authorization: "Bearer " + userDetails.token,
          },
        }
      );
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong !");
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-40 flex px-4 justify-center items-center z-50">
      <div className="bg-slate-700 relative border-2 border-white border-opacity-10 rounded-lg p-6 max-w-2xl w-full">
        <div className="absolute -top-2 -right-3">
          <button
            onClick={handleCloseModal}
            className="bg-white p-1 rounded-full flex items-center"
          >
            <IoCloseCircleSharp />
          </button>
        </div>
        <div>
          <div className="">
            <div className="my-2 flex items-center justify-between space-x-2">
              <button
                onClick={() => handleSetAmountType("expense")}
                className={`text-white font-inter text-sm font-semibold bg-zinc-800 border-4 duration-300 ${
                  amountType === "expense"
                    ? "border-white"
                    : "border-transparent"
                }  w-full py-1 rounded-md text-center `}
              >
                Expense
              </button>
              <button
                onClick={() => handleSetAmountType("income")}
                className={`text-white font-inter text-sm font-semibold bg-zinc-800 border-4 duration-300 ${
                  amountType === "income"
                    ? "border-white"
                    : "border-transparent"
                }  w-full py-1 rounded-md text-center `}
              >
                Income
              </button>
            </div>

            <div className="mt-10 space-y-4">
              <div className="space-y-2 ">
                <label
                  htmlFor="amount"
                  className="text-white font-inter text-sm sm:text-base"
                >
                  Amount
                </label>
                <div className="flex items-center">
                  <input
                    type="number"
                    value={amount}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setAmount(e.target.value)
                    }
                    placeholder="Enter the amount"
                    className={`w-full rounded-tl bg-transparent text-white border ${
                      error ? "border-red-600 " : "border-gray-500 "
                    } rounded-bl px-2 py-1 font-inter outline-none`}
                  />
                  <div className="py-2 px-2 text-white rounded-tr rounded-br bg-zinc-800 font-inter text-sm">
                    {userDetails?.currency.symbol}
                  </div>
                </div>
              </div>
              <div className="space-y-2 ">
                <label
                  htmlFor="amount"
                  className="text-white font-inter text-sm sm:text-base"
                >
                  Category
                </label>
                <div className="flex items-center">
                  <div className="w-full rounded border border-gray-500 px-2 py-5 space-y-3">
                    <div
                      className={`border ${
                        error ? "border-red-600 " : "border-gray-500 "
                      } px-2 py-2 h-10  rounded text-white font-inter text-sm sm:text-base`}
                    >
                      {category}
                    </div>
                    {amountType === "expense" ? (
                      <div className="flex items-center flex-wrap h-20 overflow-y-auto">
                        {userDetails.categories.expense.map(
                          (
                            cat: UserSliceStateType["categories"]["expense"][0],
                            ind: number
                          ) => (
                            <div
                              key={ind}
                              className="m-2 cursor-pointer"
                              onClick={() =>
                                handleSetCategory(
                                  cat.categorySymbol + " " + cat.categoryName
                                )
                              }
                            >
                              <p className="text-white border rounded px-2 py-0.5 font-inter text-xs  hover:bg-zinc-700 duration-150">
                                {cat.categoryName}
                                <span className="ml-1.5">
                                  {cat.categorySymbol}
                                </span>
                              </p>
                            </div>
                          )
                        )}
                      </div>
                    ) : (
                      <div className="flex items-center flex-wrap h-20 overflow-y-auto">
                        {userDetails.categories.income.map(
                          (
                            cat: UserSliceStateType["categories"]["income"][0],
                            ind: number
                          ) => (
                            <div
                              key={ind}
                              className="m-2 cursor-pointer"
                              onClick={() =>
                                handleSetCategory(
                                  cat.categorySymbol + " " + cat.categoryName
                                )
                              }
                            >
                              <p className="text-white border rounded px-2 py-0.5 font-inter text-xs  hover:bg-zinc-700 duration-150">
                                {cat.categoryName}
                                <span className="ml-1.5">
                                  {cat.categorySymbol}
                                </span>
                              </p>
                            </div>
                          )
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="space-y-2 ">
                <label
                  htmlFor="amount"
                  className="text-white font-inter text-sm sm:text-base"
                >
                  Account
                </label>
                <div className="flex items-center">
                  <div className="w-full rounded border border-gray-500 px-2 py-5 space-y-3">
                    <div
                      className={`border ${
                        error ? "border-red-600 " : "border-gray-500 "
                      } px-2 py-2 h-10  rounded text-white font-inter text-sm sm:text-base`}
                    >
                      {account}
                    </div>
                    <div className="flex items-center flex-wrap h-10 overflow-y-auto">
                      {userDetails.accounts.map(
                        (
                          act: UserSliceStateType["accounts"][0],
                          ind: number
                        ) => (
                          <div
                            key={ind}
                            className=" flex items-center overflow-y-auto"
                          >
                            {act.subAccounts.map(
                              (
                                actSub: UserSliceStateType["accounts"][0]["subAccounts"][0],
                                key: number
                              ) => (
                                <div
                                  key={key}
                                  className="m-2 cursor-pointer"
                                  onClick={() => handleSetAccount(actSub.name)}
                                >
                                  <p className="text-white border rounded px-2 py-0.5 font-inter text-xs  hover:bg-zinc-700 duration-150">
                                    {actSub.name}
                                  </p>
                                </div>
                              )
                            )}
                          </div>
                        )
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="amount"
                  className="text-white font-inter text-sm sm:text-base"
                >
                  Note
                </label>
                <div className="">
                  <input
                    type="text"
                    value={note}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setNote(e.target.value)
                    }
                    placeholder="Enter the details"
                    className="w-full rounded-tl bg-transparent text-white border border-gray-500 rounded-bl px-2 py-1 font-inter text-sm sm:text-base outline-none"
                  />
                </div>
              </div>
              <div className=" flex items-center justify-center space-x-2 w-full">
                <div className=" w-full">
                  <button
                    onClick={handleDelete}
                    className=" w-full text-black text-sm font-inter font-medium bg-white px-4 py-1 rounded"
                  >
                    Delete
                  </button>
                </div>
                <div className="w-full">
                  <button
                    onClick={handleUpdate}
                    className="w-full text-black text-sm font-inter font-medium bg-white px-4 py-1 rounded"
                  >
                    Update
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateRecord;
