import { useSelector } from "react-redux";
import { RootState } from "../../../../interfaces/Interfaces";
import WidgetProfile from "./components/WidgetProfile";
import classes from "./WidgetMessageArea.module.css";
const WidgetMessageArea = () => {
  const animation = useSelector<RootState, boolean>(
    (state) => state.chat.animationActive
  );
  return (
    <div
      className={`${
        animation ? classes.messageOpenContainer : classes.messageCloseContainer
      }`}
    >
      <div className=" fixed bottom-0 right-0 sm:bottom-5 sm:right-5 bg-gray-700  h-full sm:h-[40rem] w-full sm:w-[25rem] sm:rounded-3xl">
        <div className="flex flex-col">
          <WidgetProfile />
        </div>
      </div>
    </div>
  );
};

export default WidgetMessageArea;
