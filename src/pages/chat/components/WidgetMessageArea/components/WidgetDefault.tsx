import { useSelector } from "react-redux";
import logo from "../../../../../assets/em-new-ico.png";
import { Socket } from "socket.io-client";
import { RootState } from "../../../../../interfaces/Interfaces";
import { ClipLoader } from "react-spinners";
import { useState } from "react";
const WidgetDefault = () => {
  const socket: Socket | null = useSelector<RootState, Socket | null>(
    (state) => state.chat.socket
  );
  const [loading, setLoading] = useState<boolean>(false);
  const handleGetStarted = () => {
    setLoading(true);
    setTimeout(() => {
      socket?.emit("create-conversation", {});
    }, 3000);
    setTimeout(() => {
      setLoading(false);
    }, 3500);
  };
  return (
    <div className=" bg-gray-700 px-3 py-4 h-full space-y-2 rounded-3xl mx-auto">
      <div className="mt-20">
        <div className=" flex justify-center items-center">
          <img
            src={logo}
            alt="logo"
            className=" w-16 h-16 bg-white p-3 rounded-2xl"
          />
        </div>
        <p className=" font-poppins text-white text-sm mt-4 text-center">
          Hello! I’m your AI-powered chatbot. Want personalized budgeting tips
          or need to review an expense? I’ve got you covered!
        </p>
        <div className="mt-6 flex justify-center items-center">
          {loading ? (
            <div>
              <ClipLoader color="white" size={20} />
            </div>
          ) : (
            <button
              onClick={handleGetStarted}
              className=" bg-primary-green text-white font-poppins px-3 py-2 text-sm rounded-md"
            >
              Let's get started
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default WidgetDefault;
