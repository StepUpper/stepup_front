import ChatInput from "@components/Chat/ChatInput";
import ChatMessage from "@components/Chat/ChatMessage";
import ChatUserMessage from "@components/Chat/ChatUserMessage";
import Header from "@common/Header";
import { useEffect, useLayoutEffect, useRef } from "react";
import { TChatResponse } from "@/types/chat";
import useChatStore from "@/store/useChatStore";
import ChatLogin from "@/components/Chat/ChatLogin";
import ChatRecommendedQuestion from "@/components/Chat/ChatRecommendedQuestion";

const Chat = () => {
  const { messages, loadMessages } = useChatStore();

  useEffect(() => {
    loadMessages();
  }, []);

  const messageEndRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    setTimeout(() => {
      messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 0);
  }, [messages.length]);

  return (
    <div className="flex h-screen flex-col">
      <Header type="menu" />

      <main className="no-scrollbar flex-1 overflow-y-auto">
        {/* 로그인 여부에 따라 조건부 렌더링 */}
        <ChatLogin />
        {/* 로그인 성공하면 맞춤상품추천 호출하고 store에 있는 addMessage 호출해서 bot에 message 추가한다. */}

        {messages.map((msg, index) => (
          <div key={index}>
            {msg.type === "user" ? (
              <ChatUserMessage title={msg.content as string} />
            ) : (
              <ChatMessage title={msg.content as TChatResponse} />
            )}
          </div>
        ))}
        <div ref={messageEndRef} />
      </main>
      {/* 로그인 여부 && 질문 클릭 여부 */}
      <ChatRecommendedQuestion />

      <ChatInput />
    </div>
  );
};

export default Chat;
