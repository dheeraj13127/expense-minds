import { useCallback, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MessageType, RootState } from "../../../../../interfaces/Interfaces";
import axios from "axios";
import { getMessagesURL } from "../../../../../url/URL";
import { chatActions } from "../../../../../store/slices/chats-slice";
import logo from "../../../../../assets/em-new-ico.png";
import { SyncLoader } from "react-spinners";
const WidgetChat = () => {
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();

  const conversation: string | null = useSelector<RootState, string | null>(
    (state) => state.chat.conversation
  );
  const messages: MessageType[] = useSelector<RootState, MessageType[]>(
    (state) => state.chat.messages
  );
  const typing: boolean = useSelector<RootState, boolean>(
    (state) => state.chat.typing
  );
  const messageEndRef = useRef<HTMLDivElement>(null);
  const fetchMessages = useCallback(async () => {
    const messages = await axios.get(getMessagesURL, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    dispatch(
      chatActions.addBulkMessages({
        messages: messages.data.messages,
      })
    );
  }, [token, dispatch]);

  useEffect(() => {
    if (conversation && token) {
      fetchMessages();
    }
  }, [conversation, token, fetchMessages]);
  const scrollToBottom = () => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, typing]);
  return (
    <div className=" bg-black bg-opacity-35 px-3 py-4 h-full space-y-5 overflow-x-hidden overflow-y-auto flex-auto">
      {messages.length > 0 &&
        messages.map((msg: MessageType, num: number) => (
          <div
            key={num}
            className={`flex ${
              msg.sent_by === "bot" ? "justify-start" : "justify-end"
            }`}
          >
            {msg.sent_by === "bot" ? (
              <div>
                <div className=" flex items-center space-x-1">
                  <div className=" bg-white p-2 flex items-center rounded-full justify-center">
                    <img src={logo} alt="logo" className=" h-5 w-5" />
                  </div>
                  <p
                    className={`px-3 py-2 text-[14px] rounded-r-xl rounded-tl-xl text-black bg-gray-200
                          font-poppins`}
                  >
                    {msg.message}
                  </p>
                </div>
              </div>
            ) : (
              <p
                className={` px-3 py-2 text-[14px] rounded-l-xl rounded-tr-xl text-white bg-gray-600
                  font-poppins`}
              >
                {msg.message}
              </p>
            )}
          </div>
        ))}
      <div>
        {typing && (
          <div className=" flex items-center space-x-1">
            <div className=" bg-white p-2 flex items-center rounded-full justify-center">
              <img src={logo} alt="logo" className=" h-5 w-5" />
            </div>
            <p
              className={`px-3 py-2 text-[14px] rounded-r-xl rounded-tl-xl text-black bg-gray-200
                          font-poppins`}
            >
              <SyncLoader color="#000000" size={6} />
            </p>
          </div>
        )}
      </div>
      <div ref={messageEndRef} />
    </div>
  );
};

export default WidgetChat;
