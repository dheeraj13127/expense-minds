import { useState } from "react";
import { IoMdSend } from "react-icons/io";
import { useSelector } from "react-redux";
import { Socket } from "socket.io-client";
import { RootState } from "../../../../../interfaces/Interfaces";
const WidgetInput = () => {
  const socket: Socket | null = useSelector<RootState, Socket | null>(
    (state) => state.chat.socket
  );
  const conversation: string | null = useSelector<RootState, string | null>(
    (state) => state.chat.conversation
  );
  const [message, setMessage] = useState<string>("");
  const handleMessage = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };
  const handleSubmit = async () => {
    if (message.trim() !== "") {
      socket?.emit(
        "dm-user",
        JSON.stringify({ message: message.trim(), conversation: conversation })
      );
      setMessage("");
    } else {
      setMessage("");
    }
  };
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSubmit();
    }
  };
  return (
    <div className=" px-3 py-4 flex items-center space-x-2">
      <div className=" w-full">
        <input
          type="text"
          autoComplete="off"
          name="message"
          onChange={handleMessage}
          value={message}
          onKeyDown={handleKeyDown}
          placeholder="Type your message..."
          className=" bg-gray-500 text-white font-poppins flex-1 outline-none w-full rounded-3xl p-2 placeholder:text-sm"
        />
      </div>
      <div>
        <button onClick={handleSubmit}>
          <IoMdSend color="white" size={22} />
        </button>
      </div>
    </div>
  );
};

export default WidgetInput;
