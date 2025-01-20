import { IoCloseCircleSharp } from "react-icons/io5";
import {
  RootState,
  UpdateCategoryModalType,
  UserSliceStateType,
} from "../../../../../interfaces/Interfaces";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";
import { MdOutlineEmojiEmotions } from "react-icons/md";
import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { deleteCategoryURL, updateCategoryURL } from "../../../../../url/URL";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../../../../../store/slices/user-slice";
const UpdateCategoryModal = ({
  setShowUpdateModal,
  categoryType,
}: UpdateCategoryModalType) => {
  const handleCloseModal = () => {
    setShowUpdateModal(false);
  };
  const dispatch = useDispatch();
  const userDetails = useSelector<RootState, UserSliceStateType>(
    (state) => state.user
  );
  const toBeUpdatedCategory = useSelector<
    RootState,
    UserSliceStateType["toBeUpdatedCategory"]
  >((state) => state.user.toBeUpdatedCategory);
  const [emojiOpen, setEmojiOpen] = useState<boolean>(false);
  const [categoryName, setCategoryName] = useState<string>(
    toBeUpdatedCategory?.categoryName
  );
  const [categorySymbol, setCategorySymbol] = useState<string>(
    toBeUpdatedCategory?.categorySymbol
  );
  const handleOpenEmoji = () => {
    setEmojiOpen(!emojiOpen);
  };
  const onEmojiClick = (emojiObject: EmojiClickData) => {
    setCategorySymbol(emojiObject.emoji);
    setEmojiOpen(false);
  };
  const handleUpdate = async () => {
    if (categoryName === "" || categorySymbol === "") {
      toast.error("Please fill in the fields !");
    } else {
      try {
        const data = {
          categoryName,
          categorySymbol,
          categoryType,
          _id: toBeUpdatedCategory._id,
        };

        const result = await axios.put(
          updateCategoryURL,
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
          userActions.updateExistingCategory({
            category: result.data.result,
            categoryType: categoryType,
          })
        );
        toast.success("Updated successfully");
        setShowUpdateModal(false);
      } catch (err) {
        console.log(err);
        toast.error("Something went wrong !");
      }
    }
  };
  const handleDelete = async () => {
    try {
      await axios.delete(
        `${deleteCategoryURL}?id=${toBeUpdatedCategory._id}&categoryType=${categoryType}`,

        {
          headers: {
            Authorization: "Bearer " + userDetails.token,
          },
        }
      );
      dispatch(
        userActions.deleteExistingCategory({
          id: toBeUpdatedCategory._id,
          categoryType: categoryType,
        })
      );
      toast.success("Deleted successfully");
      setShowUpdateModal(false);
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
          <div className=" space-y-4">
            <div className=" space-y-2">
              <label
                htmlFor="category-name"
                className=" text-white font-poppins"
              >
                Category name
              </label>
              <input
                type="text"
                value={categoryName}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setCategoryName(e.target.value)
                }
                required
                className=" outline-none w-full rounded bg-transparent border-2 border-white border-opacity-50 p-2 font-poppins text-white"
              />
            </div>

            <div className=" space-y-2">
              <label
                htmlFor="category-name"
                className=" text-white font-poppins"
              >
                Category symbol
              </label>
              <div className="flex items-center space-x-1">
                <input
                  type="text"
                  value={categorySymbol}
                  disabled
                  required
                  className="  outline-none w-full rounded bg-transparent border-2 border-white border-opacity-50 p-2 font-poppins text-white"
                />
                <div
                  onClick={handleOpenEmoji}
                  className=" border p-3 rounded bg-black cursor-pointer"
                >
                  <MdOutlineEmojiEmotions color="white" size={18} />
                </div>
              </div>

              <div className=" flex justify-center w-full">
                <EmojiPicker
                  onEmojiClick={onEmojiClick}
                  open={emojiOpen}
                  width={480}
                />
              </div>
            </div>
            <div className="flex justify-center items-center space-x-4">
              <button
                onClick={handleDelete}
                className=" bg-white text-black font-poppins text-sm px-3 py-2 rounded"
              >
                Delete
              </button>
              <button
                onClick={handleUpdate}
                className=" bg-black text-white font-poppins text-sm px-3 py-2 rounded"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateCategoryModal;
