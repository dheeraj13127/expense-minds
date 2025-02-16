import { useDispatch } from "react-redux";
import { IoMdClose } from "react-icons/io";
import { chatActions } from "../../../../../store/slices/chats-slice";
import logo from "../../../../../assets/em-new-ico.png";
const WidgetProfile = () => {
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
      <div className=" flex items-center space-x-3">
        <div className=" bg-white  p-2 flex items-center rounded-full justify-center">
          <img src={logo} alt="logo" className=" h-6 w-6" />
        </div>
        <div className=" space-y-0.5">
          <p className="font-roboto text-white  font-medium">Expy AI Chat</p>
          <div className=" flex items-center space-x-1">
            <div className="h-2 w-2 rounded-full bg-green-600"></div>
            <p className=" text-white text-opacity-70 font-poppins text-xs">
              Active
            </p>
          </div>
        </div>
      </div>

      <button onClick={handleCloseWidget}>
        <IoMdClose size={24} color="white" />
      </button>
    </div>
  );
};

export default WidgetProfile;
