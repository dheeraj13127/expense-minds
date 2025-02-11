import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../../interfaces/Interfaces";
import { IoMdClose } from "react-icons/io";
import { chatActions } from "../../../../../store/slices/chats-slice";
const WidgetProfile = () => {
  const userName: string = useSelector<RootState, string>(
    (state) => state.user.name
  );
  const dispatch = useDispatch();
  const handleCloseWidget = () => {
    dispatch(
      chatActions.setAnimationActive({
        animationActive: false,
      })
    );

    setTimeout(() => {
      dispatch(
        chatActions.setWidgetActive({
          widgetActive: false,
        })
      );
    }, 250);
  };
  return (
    <div className=" bg-gray-500  border-opacity-20 sm:rounded-t-3xl px-4 py-3 flex items-center justify-between">
      <div className="h-8 w-8 bg-white text-black font-poppins flex items-center rounded-full justify-center">
        {userName[0]}
      </div>
      <button onClick={handleCloseWidget}>
        <IoMdClose size={24} color="white" />
      </button>
    </div>
  );
};

export default WidgetProfile;
