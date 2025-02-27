import { Route, Routes } from "react-router-dom";
import Records from "../records/Records";
import Transactions from "../transactions/Transactions";
import Error from "./components/error/Error";
import Statistics from "../statistics/Statistics";
import Tools from "../tools/Tools";
import Settings from "../settings/Settings";
import Chat from "../chat/Chat";
import { useDispatch, useSelector } from "react-redux";
import {
  ConversationCreatedType,
  MessageType,
  RootState,
} from "../../interfaces/Interfaces";
import SocketIOClient, { Socket } from "socket.io-client";
import { socketURL } from "../../url/URL";
import { useEffect } from "react";
import { chatActions } from "../../store/slices/chats-slice";
const Dashboard = () => {
  const widgetActive = useSelector<RootState, boolean>(
    (state) => state.chat.widgetActive
  );

  const token = localStorage.getItem("token");

  const dispatch = useDispatch();
  useEffect(() => {
    if (token) {
      const newSocket: Socket = SocketIOClient(`${socketURL}/?token=${token}`);

      dispatch(
        chatActions.setSocket({
          socket: newSocket,
        })
      );
      newSocket.on("conversation-created", (data: string) => {
        const resp: ConversationCreatedType = JSON.parse(data);
        dispatch(
          chatActions.setConversation({
            conversation: resp.conversation._id,
          })
        );
      });
      newSocket.on("dm-user-answer", (data: string) => {
        const resp: MessageType = JSON.parse(data);

        dispatch(
          chatActions.addMessage({
            message: resp.message,
          })
        );
      });
      newSocket.on("typing-answer", () => {
        setTimeout(() => {
          dispatch(
            chatActions.setTyping({
              typing: true,
            })
          );
        }, 500);
      });

      return () => {
        newSocket.close();
        dispatch(
          chatActions.setSocket({
            socket: null,
          })
        );
      };
    }
  }, [token, dispatch]);
  return (
    <div>
      <Routes>
        <Route path="/records/*" element={<Records />} />
        <Route path="/transactions/*" element={<Transactions />} />
        <Route path="/statistics/*" element={<Statistics />} />
        <Route path="/tools" element={<Tools />} />
        <Route path="/settings/*" element={<Settings />} />

        <Route path="*" element={<Error />} />
      </Routes>
      {widgetActive && <Chat />}
    </div>
  );
};

export default Dashboard;
