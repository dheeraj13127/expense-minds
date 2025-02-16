import { useSelector } from "react-redux";
import { RootState } from "../../../../interfaces/Interfaces";
import WidgetProfile from "./components/WidgetProfile";
import classes from "./WidgetMessageArea.module.css";
import WidgetInput from "./components/WidgetInput";
import WidgetChat from "./components/WidgetChat";
import { useEffect } from "react";
import WidgetDefault from "./components/WidgetDefault";
import WidgetCompany from "./components/WIdgetCompany";
const WidgetMessageArea = () => {
  const animation = useSelector<RootState, boolean>(
    (state) => state.chat.animationActive
  );
  const active = useSelector<RootState, boolean>(
    (state) => state.chat.widgetActive
  );
  const conversation: string | null = useSelector<RootState, string | null>(
    (state) => state.chat.conversation
  );
  useEffect(() => {
    if (active) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [active]);
  return (
    <div
      className={`${
        animation ? classes.messageOpenContainer : classes.messageCloseContainer
      }`}
    >
      <div className=" fixed bottom-0 right-0 sm:bottom-5 sm:right-5 bg-gray-700  h-full sm:h-[40rem] w-full sm:w-[25rem] sm:rounded-3xl">
        <div className="flex flex-col justify-between h-full">
          <WidgetProfile />
          {conversation ? (
            <>
              <WidgetChat />
              <WidgetInput />
            </>
          ) : (
            <WidgetDefault />
          )}
          <WidgetCompany />
        </div>
      </div>
    </div>
  );
};

export default WidgetMessageArea;
