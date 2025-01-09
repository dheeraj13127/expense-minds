import { useSelector } from "react-redux";
import {
  RootState,
  UserSliceStateType,
} from "../../../../interfaces/Interfaces";
import { useState } from "react";
import TipsBar from "../../../../components/TipsBar/TipsBar";
import Calculator from "../../../../components/Calculator/Calculator";
import { CircleLoader } from "react-spinners";
import toast from "react-hot-toast";
import axios from "axios";
import { createRecordURL } from "../../../../url/URL";
const Manual = () => {
  const userDetails = useSelector<RootState, UserSliceStateType>(
    (state) => state.user
  );

  const [amount, setAmount] = useState<string>();
  const [amountType, setAmountType] = useState<string>("Expense");
  const [category, setCategory] = useState<string>("");
  const [account, setAccount] = useState<string>("");
  const [note, setNote] = useState<string>("");
  const [error, setError] = useState<boolean>(false);
  const handleSetAmountType = (data: string) => {
    setAmountType(data);
  };
  const handleSetCategory = (data: string) => {
    setCategory(data);
  };
  const handleSetAccount = (data: string) => {
    setAccount(data);
  };
  const handleResetData = () => {
    setAmount("");
    setCategory("");
    setAmountType("Expense");
    setAccount("");
    setNote("");
  };
  const handleSubmit = async () => {
    if (amount === "" || category === "" || account === "") {
      setError(true);
    } else {
      setError(false);
      const data = {
        userId: userDetails.id,
        amount,
        category,
        amountType: amountType.toLocaleLowerCase(),
        account,
        note,
      };
      handleResetData();
      try {
        await axios.post(
          createRecordURL,
          {
            data: data,
          },
          {
            headers: {
              Authorization: "Bearer " + userDetails.token,
            },
          }
        );

        toast.success("Added successfully !");
      } catch (err) {
        console.log(err);
        toast.error("Something went wrong !");
      }
    }
  };
  return (
    <div className=" my-16">
      {userDetails.categories.expense.length > 0 ? (
        <div className="">
          <div className="grid grid-cols-12 lg:px-16 gap-6">
            <div className="col-span-12 lg:col-span-7 2xl:col-span-7 bg-black px-6 py-6 rounded-md">
              <div className="">
                <div className="my-2 flex items-center justify-between space-x-2">
                  <button
                    onClick={() => handleSetAmountType("Expense")}
                    className={`text-white font-inter text-sm font-semibold bg-zinc-800 border-4 duration-300 ${
                      amountType === "Expense"
                        ? "border-primary-green"
                        : "border-transparent"
                    }  w-full py-1 rounded-md text-center `}
                  >
                    Expense
                  </button>
                  <button
                    onClick={() => handleSetAmountType("Income")}
                    className={`text-white font-inter text-sm font-semibold bg-zinc-800 border-4 duration-300 ${
                      amountType === "Income"
                        ? "border-primary-green"
                        : "border-transparent"
                    }  w-full py-1 rounded-md text-center `}
                  >
                    Income
                  </button>
                </div>

                <div className="mt-10 space-y-4">
                  <div className="space-y-2 ">
                    <label htmlFor="amount" className="text-white font-inter">
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
                          error ? "border-red-600 " : "border-gray-600 "
                        } rounded-bl px-2 py-1 font-inter outline-none`}
                      />
                      <div className="py-2 px-2 text-white rounded-tr rounded-br bg-zinc-800 font-inter text-sm">
                        {userDetails?.currency.symbol}
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2 ">
                    <label htmlFor="amount" className="text-white font-inter">
                      Category
                    </label>
                    <div className="flex items-center">
                      <div className="w-full rounded border border-gray-600 px-2 py-5 space-y-3">
                        <div
                          className={`border ${
                            error ? "border-red-600 " : "border-gray-600 "
                          } px-2 py-2 h-10  rounded text-white font-inter`}
                        >
                          {category}
                        </div>
                        {amountType === "Expense" ? (
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
                                      cat.categorySymbol +
                                        " " +
                                        cat.categoryName
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
                          <div className="flex  flex-wrap h-20 overflow-y-auto">
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
                                      cat.categorySymbol +
                                        " " +
                                        cat.categoryName
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
                    <label htmlFor="amount" className="text-white font-inter">
                      Account
                    </label>
                    <div className="flex items-center">
                      <div className="w-full rounded border border-gray-600 px-2 py-5 space-y-3">
                        <div
                          className={`border ${
                            error ? "border-red-600 " : "border-gray-600 "
                          } px-2 py-2 h-10  rounded text-white font-inter`}
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
                                      onClick={() =>
                                        handleSetAccount(actSub.name)
                                      }
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
                    <label htmlFor="amount" className="text-white font-inter">
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
                        className="w-full rounded-tl bg-transparent text-white border border-gray-600 rounded-bl px-2 py-1 font-inter outline-none"
                      />
                    </div>
                  </div>
                  <div className="space-y-2 flex items-center justify-center">
                    <button
                      onClick={handleSubmit}
                      className=" text-white font-inter bg-orange-800 px-4 py-1 rounded"
                    >
                      Add
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-span-12 lg:col-span-5 2xl:col-span-5 bg-black px-6 py-6 rounded-md">
              <TipsBar />
              <Calculator />
            </div>
          </div>
        </div>
      ) : (
        <div className=" flex justify-center   items-center ">
          <div className=" my-80">
            <CircleLoader color="#fff" />
          </div>
        </div>
      )}
    </div>
  );
};

export default Manual;
