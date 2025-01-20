import { useSelector } from "react-redux";
import {
  RootState,
  UserSliceStateType,
} from "../../../../interfaces/Interfaces";
import { useEffect, useState } from "react";
import CreateCategoryModal from "./components/CreateCategoryModal";

const Categories = () => {
  const userDetails = useSelector<RootState, UserSliceStateType>(
    (state) => state.user
  );
  const [showCreateModal, setShowCreateModal] = useState<boolean>(false);
  const [categoryType, setCategoryType] = useState<string>("");
  useEffect(() => {
    if (showCreateModal) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [showCreateModal]);

  const handleCreateCategoryModal = (catType: string) => {
    setShowCreateModal(true);
    setCategoryType(catType);
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
                Add
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
                    <p className="text-white font-poppins cursor-pointer hover:bg-opacity-80 duration-150 text-sm text-center bg-gray-800 px-1 py-2 rounded">
                      {ce.categoryName}{" "}
                      <span className="ml-1.5">{ce.categorySymbol}</span>
                    </p>
                  </div>
                )
              )}
            </div>
          ) : (
            <div className="font-poppins text-white text-center my-20">
              Loading...
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Categories;
