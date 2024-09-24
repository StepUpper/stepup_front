import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { TChatResponse } from "@/types/chat";
import { getSharedMessageById } from "@/apis/firebase/chatFirestore";
import { chatListIcon } from "@/assets/assets";
import ChatUserMessage from "./ChatUserMessage";
import ChatMessage from "./ChatMessage";

interface SeparatedMessage {
  type: "user" | "bot";
  content: string | TChatResponse;
}

const ChatShareView = () => {
  const navigate = useNavigate();
  const { messageId } = useParams();
  const [message, setMessage] = useState<SeparatedMessage[]>([]);
  const [formattedDate, setFormattedDate] = useState("");

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

          if (data.timestamp) {
            const formatted = data.timestamp
              .toDate()
              .toLocaleDateString("ko-KR", {
                year: "numeric",
                month: "long",
                day: "numeric",
              });
            setFormattedDate(formatted);
          }
        }
      });
    }
  }, [messageId]);

  const title = message[0]?.content as string;

  return (
    <div className="flex h-screen flex-col">
      <header className="h-36 border-b p-4">
        <img src={chatListIcon} alt="chatCircleIcon" className="mb-2" />
        <p className="mb-2 text-heading font-semibold">{title}</p>
        <p className="font-[#52525B] text-body3">{formattedDate}</p>
      </header>
      <main className="no-scrollbar flex-1 overflow-y-auto">
        {message.map((msg, index) => (
          <div key={index}>
            {msg.type === "user" ? (
              <ChatUserMessage title={msg.content as string} />
            ) : (
              <ChatMessage title={msg.content as TChatResponse} />
            )}
          </div>
        ))}
      </main>
      <div className="flex justify-center p-4">
        <button
          className="h-14 w-full max-w-md rounded-lg bg-black text-white"
          onClick={() => navigate("/onboarding")}
        >
          핏톡 시작하기
        </button>
      </div>
    </div>
  );
};

export default ChatShareView;
