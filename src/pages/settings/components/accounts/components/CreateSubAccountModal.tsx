import { IoCloseCircleSharp } from "react-icons/io5";
import {
  CreateSubAccountModalType,
  RootState,
  UserSliceStateType,
} from "../../../../../interfaces/Interfaces";
import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { createSubAccountURL } from "../../../../../url/URL";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../../../../../store/slices/user-slice";

interface SubAccountDataType {
  name: string;
  description: string;
  amount: number;
}
const CreateSubAccountModal = ({
  setShowCreateSubAccountModal,
}: CreateSubAccountModalType) => {
  const handleCloseModal = () => {
    setShowCreateSubAccountModal(false);
  };
  const dispatch = useDispatch();
  const userDetails = useSelector<RootState, UserSliceStateType>(
    (state) => state.user
  );
  const parentAccountGroup = useSelector<
    RootState,
    UserSliceStateType["parentAccountGroup"]
  >((state) => state.user.parentAccountGroup);

  const [subAccountData, setSubAccountData] = useState<SubAccountDataType>({
    name: "",
    description: "",
    amount: 0,
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSubAccountData({
      ...subAccountData,
      [name]: name === "amount" ? Number(value) : value,
    });
  };
  const handleSubmit = async () => {
    if (subAccountData.name === "") {
      toast.error("Please fill in the fields !");
    } else {
      try {
        const data = {
          groupId: parentAccountGroup._id,
          name: subAccountData.name,
          description: subAccountData.description,
          amount: subAccountData.amount,
        };

        const result = await axios.post(
          createSubAccountURL,
          {
            data,
          },
          {
            headers: {
              Authorization: "Bearer " + userDetails.token,
            },
          }
        );
        dispatch(
          userActions.addNewSubAccount({
            accounts: result.data.result,
          })
        );
        toast.success("Added successfully");
        setShowCreateSubAccountModal(false);
      } catch (err) {
        console.log(err);
        toast.error("Something went wrong !");
      }
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
          <div className=" space-y-4">
            <div className=" space-y-2">
              <label
                htmlFor="category-name"
                className=" text-white font-poppins"
              >
                Account Group
              </label>
              <input
                type="text"
                value={parentAccountGroup?.groupName}
                disabled
                className=" outline-none w-full rounded bg-transparent border-2 border-white border-opacity-50 p-2 font-poppins text-white"
              />
            </div>
            <div className=" space-y-2">
              <label
                htmlFor="category-name"
                className=" text-white font-poppins"
              >
                Name
              </label>
              <input
                type="text"
                name="name"
                value={subAccountData.name}
                onChange={handleChange}
                required
                className=" outline-none w-full rounded bg-transparent border-2 border-white border-opacity-50 p-2 font-poppins text-white"
              />
            </div>
            <div className=" space-y-2">
              <label
                htmlFor="category-name"
                className=" text-white font-poppins"
              >
                Description
              </label>
              <input
                type="text"
                name="description"
                value={subAccountData.description}
                onChange={handleChange}
                required
                className=" outline-none w-full rounded bg-transparent border-2 border-white border-opacity-50 p-2 font-poppins text-white"
              />
            </div>
            <div className=" space-y-2">
              <label
                htmlFor="category-name"
                className=" text-white font-poppins"
              >
                Amount
              </label>
              <input
                type="number"
                name="amount"
                value={subAccountData.amount}
                onChange={handleChange}
                required
                className=" outline-none w-full rounded bg-transparent border-2 border-white border-opacity-50 p-2 font-poppins text-white"
              />
            </div>

            <div className="flex justify-center items-center">
              <button
                onClick={handleSubmit}
                className=" bg-black text-white font-poppins text-sm px-3 py-2 rounded"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateSubAccountModal;
