import ChatInput from "@components/Chat/ChatInput";
import ChatMessage from "@components/Chat/ChatMessage";
import ChatUserMessage from "@components/Chat/ChatUserMessage";
import Header from "@common/Header";
import { useEffect, useLayoutEffect, useRef } from "react";
import { TChatResponse } from "@/types/chat";
import ChatLogin from "@components/Chat/ChatLogin";
import ChatRecommendedQuestion from "@/components/Chat/ChatRecommendedQuestion";
import LoginBottomSheet from "@/components/login/LoginBottomSheet";
import userStore from "@/store/auth.store";
import useChatStore from "@/store/chat.store";

const Chat = () => {
  const { guestMessages, userMessages, loadGuestMessages, loadUserMessages } =
    useChatStore();

  const { isLoggedIn, user } = userStore();

  const userId = user?.uid!;

  useEffect(() => {
    if (isLoggedIn) {
      loadUserMessages(userId);
    } else {
      loadGuestMessages();
    }
  }, [isLoggedIn, userId]);

  const messageEndRef = useRef<HTMLDivElement | null>(null);

  // 스크롤을 항상 하단에 위치시키기
  useLayoutEffect(() => {
    setTimeout(() => {
      messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 0);
  }, [isLoggedIn ? userMessages.length : guestMessages.length]);

  return (
    <div className="flex h-screen flex-col">
      <Header type="menu" />
      <LoginBottomSheet />
      <main className="no-scrollbar flex-1 overflow-y-auto">
        {!isLoggedIn && <ChatLogin />}

        {(isLoggedIn ? userMessages : guestMessages).map((msg, index) => (
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

      <ChatRecommendedQuestion />
      <ChatInput />
    </div>
  );
};

export default Chat;
