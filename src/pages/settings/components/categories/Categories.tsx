import { useDispatch, useSelector } from "react-redux";
import {
  RootState,
  UserSliceStateType,
} from "../../../../interfaces/Interfaces";
import { useEffect, useState } from "react";
import CreateCategoryModal from "./components/CreateCategoryModal";
import UpdateCategoryModal from "./components/UpdateCategoryModal";
import { userActions } from "../../../../store/slices/user-slice";
import { CircleLoader } from "react-spinners";
import { FaPlus } from "react-icons/fa";

const Categories = () => {
  const userDetails = useSelector<RootState, UserSliceStateType>(
    (state) => state.user
  );
  const [showCreateModal, setShowCreateModal] = useState<boolean>(false);
  const [showUpdateModal, setShowUpdateModal] = useState<boolean>(false);
  const [categoryType, setCategoryType] = useState<string>("");
  const dispatch = useDispatch();
  useEffect(() => {
    if (showCreateModal || showUpdateModal) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [showCreateModal, showUpdateModal]);

  const handleCreateCategoryModal = (catType: string) => {
    setShowCreateModal(true);
    setCategoryType(catType);
  };
  const handleUpdateCategoryModal = (
    cat: UserSliceStateType["categories"]["expense"][0],
    catType: string
  ) => {
    dispatch(
      userActions.setToBeUpdatedCategory({
        toBeUpdatedCategory: cat,
      })
    );
    setCategoryType(catType);
    setShowUpdateModal(true);
  };
  return (
    <div className="grid grid-cols-12">
      <div className="col-span-12">
        {showCreateModal && (
          <CreateCategoryModal
            setShowCreateModal={setShowCreateModal}
            categoryType={categoryType}
          />
        )}
        {showUpdateModal && (
          <UpdateCategoryModal
            setShowUpdateModal={setShowUpdateModal}
            categoryType={categoryType}
          />
        )}
      </div>
      <div className=" col-span-12">
        <div className="bg-black w-full px-4 py-8 rounded">
          <div className="flex items-center justify-between">
            <p className="text-white text- font-poppins">Expense</p>
            <div>
              <button
                onClick={() => handleCreateCategoryModal("expense")}
                className=" text-black text-sm font-inter bg-white px-3 py-1 rounded hover:bg-opacity-90 duration-150"
              >
                <FaPlus color="black" size={14} />
              </button>
            </div>
          </div>
          {userDetails?.categories.expense.length !== 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-6 mt-10">
              {userDetails?.categories.expense.map(
                (
                  ce: UserSliceStateType["categories"]["expense"][0],
                  num: number
                ) => (
                  <div key={num} className="">
                    <p
                      onClick={() => handleUpdateCategoryModal(ce, "expense")}
                      className="text-white font-poppins cursor-pointer hover:bg-opacity-80 duration-150 text-sm text-center bg-gray-800 px-1 py-2 rounded"
                    >
                      {ce.categoryName}{" "}
                      <span className="ml-1.5">{ce.categorySymbol}</span>
                    </p>
                  </div>
                )
              )}
            </div>
          ) : (
            <div className="font-poppins text-white flex justify-center text-center my-20">
              <CircleLoader color="#fff" />
            </div>
          )}
        </div>
      </div>
      <div className=" col-span-12 mt-10">
        <div className="bg-black w-full px-4 py-8 rounded">
          <div className="flex items-center justify-between">
            <p className="text-white text- font-poppins">Income</p>
            <div>
              <button
                onClick={() => handleCreateCategoryModal("income")}
                className=" text-black text-sm font-inter bg-white px-3 py-1 rounded hover:bg-opacity-90 duration-150"
              >
                <FaPlus color="black" size={14} />
              </button>
            </div>
          </div>
          {userDetails?.categories.income.length !== 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-6 mt-10">
              {userDetails?.categories.income.map(
                (
                  ce: UserSliceStateType["categories"]["income"][0],
                  num: number
                ) => (
                  <div key={num} className="">
                    <p
                      onClick={() => handleUpdateCategoryModal(ce, "income")}
                      className="text-white font-poppins cursor-pointer hover:bg-opacity-80 duration-150 text-sm text-center bg-gray-800 px-1 py-2 rounded"
                    >
                      {ce.categoryName}{" "}
                      <span className="ml-1.5">{ce.categorySymbol}</span>
                    </p>
                  </div>
                )
              )}
            </div>
          ) : (
            <div className="font-poppins text-white flex justify-center text-center my-20">
              <CircleLoader color="#fff" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Categories;
