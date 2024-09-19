import { useEffect, useLayoutEffect, useRef } from "react";
import ChatInput from "@components/Chat/ChatInput";
import ChatMessage from "@components/Chat/ChatMessage";
import ChatUserMessage from "@components/Chat/ChatUserMessage";
import Header from "@common/Header";
import { TChatResponse } from "@/types/chat";
import ChatLogin from "@components/Chat/ChatLogin";
import ChatRecommendedQuestion from "@components/Chat/ChatRecommendedQuestion";
import LoginBottomSheet from "@components/login/LoginBottomSheet";
import BrandPLPBottomSheet from "@components/plp/BrandPLPBottomSheet";
import userStore from "@store/auth.store";
import useChatStore from "@store/chat.store";
import productAndBrandStore from "@store/productAndBrand.store";
import InterestKeywordsBottomSheet from "@/components/Chat/InterestKeywordsBottomSheet";
import { useBottomSheet } from "@/store/bottomSheet.store";

const Chat = () => {
  const { guestMessages, userMessages, loadGuestMessages, loadUserMessages } =
    useChatStore();
  const { clickedProducts, clickedBrand } = productAndBrandStore();

  const { isLoggedIn, user } = userStore();

  const { sheets } = useBottomSheet();

  const userId = user?.uid!;

  // TODO: 현재 바텀시트 상태 체크용 제거 예정
  useEffect(() => {
    console.log("현재 바텀시트 상태:", sheets);
  }, [sheets]);

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

      {/* 로그인 */}
      {sheets["login"] && sheets["login"].isOpen && <LoginBottomSheet />}
      {/* 관심 키워드 */}
      {sheets["interestKeywords"] && sheets["interestKeywords"].isOpen && (
        <InterestKeywordsBottomSheet />
      )}
      {/* 브랜드 PLP */}
      {clickedBrand && <BrandPLPBottomSheet brandName={clickedBrand} />}
    </div>
  );
};

export default Chat;
