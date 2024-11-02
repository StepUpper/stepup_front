import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { TChatResponse } from "@/types/chat";
import { getSharedMessageById } from "@/apis/firebase/chatFirestore";
import { chatListIcon } from "@/assets/assets";
import ChatUserMessage from "./ChatUserMessage";
import ChatMessage from "./ChatMessage";
import ShareView from "@components/common/ShareView";
import { Timestamp } from "firebase/firestore";

interface SeparatedMessage {
  type: "user" | "bot";
  content: string | TChatResponse;
}

const ChatShareView = () => {
  const { messageId } = useParams();
  const [message, setMessage] = useState<SeparatedMessage[]>([]);
  const [timestamp, setTimestamp] = useState<Timestamp>();

  useEffect(() => {
    if (messageId) {
      getSharedMessageById(messageId).then((data) => {
        if (data) {
          // 데이터 가공: user와 bot 메시지를 각각 분리
          const formattedMessages: SeparatedMessage[] = [];

          if (data.user) {
            formattedMessages.push({
              type: "user",
              content: data.user,
            });
          }

          if (data.bot) {
            formattedMessages.push({
              type: "bot",
              content: data.bot,
            });
          }

          setMessage(formattedMessages);
          setTimestamp(data.timestamp);
        }
      });
    }
  }, [messageId]);

  const title = message[0]?.content as string;

  return (
    <>
      <ShareView
        icon={chatListIcon}
        title={title}
        timestamp={timestamp?.toDate()}
      >
        {message.map((msg, index) => (
          <div key={index}>
            {msg.type === "user" ? (
              <ChatUserMessage title={msg.content as string} />
            ) : (
              <ChatMessage title={msg.content as TChatResponse} />
            )}
          </div>
        ))}
      </ShareView>
    </>
  );
};

export default ChatShareView;
