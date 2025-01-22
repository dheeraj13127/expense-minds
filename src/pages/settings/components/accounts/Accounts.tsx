import { useDispatch, useSelector } from "react-redux";
import {
  RootState,
  UserSliceStateType,
} from "../../../../interfaces/Interfaces";
import { FaPlus } from "react-icons/fa";
import { useState } from "react";
import CreateSubAccountModal from "./components/CreateSubAccountModal";
import { userActions } from "../../../../store/slices/user-slice";
import UpdateSubAccountModal from "./components/UpdateSubAccountModal";

const Accounts = () => {
  const userDetails = useSelector<RootState, UserSliceStateType>(
    (state) => state.user
  );
  const dispatch = useDispatch();
  const [showCreateSubAccountModal, setShowCreateSubAccountModal] =
    useState<boolean>(false);
  const [showUpdateSubAccountModal, setShowUpdateSubAccountModal] =
    useState<boolean>(false);

  const handleCreateSubAccountModal = (_id: string, groupName: string) => {
    dispatch(
      userActions.setParentAccountGroup({
        parentAccountGroup: {
          _id,
          groupName,
        },
      })
    );
    setShowCreateSubAccountModal(true);
  };
  const handleUpdateSubAccountModal = (
    _id: string,
    groupName: string,
    subAcc: UserSliceStateType["accounts"][0]["subAccounts"][0]
  ) => {
    dispatch(
      userActions.setParentAccountGroup({
        parentAccountGroup: {
          _id,
          groupName,
        },
      })
    );
    dispatch(
      userActions.setToBeUpdatedSubAccount({
        toBeUpdatedSubAccount: subAcc,
      })
    );
    setShowUpdateSubAccountModal(true);
  };
  return (
    <div className=" grid grid-cols-12">
      <div className="col-span-12">
        {showCreateSubAccountModal && (
          <CreateSubAccountModal
            setShowCreateSubAccountModal={setShowCreateSubAccountModal}
          />
        )}
        {showUpdateSubAccountModal && (
          <UpdateSubAccountModal
            setShowUpdateSubAccountModal={setShowUpdateSubAccountModal}
          />
        )}
      </div>
      <div className=" col-span-12">
        <div className="bg-black w-full px-4 py-8 rounded">
          <div className=" space-y-4">
            {userDetails?.accounts.map(
              (acc: UserSliceStateType["accounts"][0], key: number) => (
                <div key={key} className="bg-zinc-900 px-2 py-3 rounded-md">
                  <div className="flex items-center justify-between">
                    <p className="font-inter text-sm text-white font-medium">
                      {acc.groupName}
                    </p>
                    <div className="">
                      <button
                        onClick={() =>
                          handleCreateSubAccountModal(acc._id, acc.groupName)
                        }
                        className=" text-black text-sm font-inter bg-white px-3 py-1 rounded hover:bg-opacity-90 duration-150"
                      >
                        <FaPlus color="black" size={14} />
                      </button>
                    </div>
                  </div>

                  <div className=" space-y-4 mt-4">
                    {acc.subAccounts.map(
                      (
                        subAcc: UserSliceStateType["accounts"][0]["subAccounts"][0],
                        num: number
                      ) => (
                        <div
                          key={num}
                          onClick={() =>
                            handleUpdateSubAccountModal(
                              acc._id,
                              acc.groupName,
                              subAcc
                            )
                          }
                          className="bg-gray-800  px-2 py-3 rounded-md flex items-center cursor-pointer justify-between"
                        >
                          <div className=" space-y-2">
                            <p className="font-inter text-sm text-white font-medium">
                              {subAcc.name}
                            </p>
                            {subAcc.description !== "" && (
                              <p className="font-inter text-xs text-white text-opacity-50 font-medium">
                                {subAcc.description}
                              </p>
                            )}
                          </div>

                          <p className="font-inter text-sm text-white text-opacity-70 font-medium">
                            {subAcc.amount.toFixed(2)}
                          </p>
                        </div>
                      )
                    )}
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Accounts;
