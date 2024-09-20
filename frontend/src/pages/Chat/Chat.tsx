import { useEffect, useLayoutEffect, useRef } from "react";
import { motion } from "framer-motion";
import ChatInput from "@components/Chat/ChatInput";
import ChatMessage from "@components/Chat/ChatMessage";
import ChatUserMessage from "@components/Chat/ChatUserMessage";
import Header from "@common/Header";
import { TChatResponse } from "@/types/chat";
import ChatLogin from "@components/Chat/ChatLogin";
import ChatRecommendedQuestion from "@components/Chat/ChatRecommendedQuestion";
import LoginBottomSheet from "@components/login/LoginBottomSheet";
import PLPBottomSheet from "@/components/plp/PLPBottomSheet";
import userStore from "@store/auth.store";
import useChatStore from "@store/chat.store";
import productAndBrandStore from "@store/productAndBrand.store";
import InterestKeywordsBottomSheet from "@components/Chat/InterestKeywordsBottomSheet";
import { useBottomSheet } from "@store/bottomSheet.store";

const Chat = () => {
  const { guestMessages, userMessages, loadGuestMessages, loadUserMessages } =
    useChatStore();
  const { clickedProducts, clickedBrand } = productAndBrandStore();

  const { isLoggedIn, user } = userStore();

  const { sheets } = useBottomSheet();
  const login = sheets["login"] || {}; // 로그인/회원가입 바텀 상태
  const interestKeywords = sheets["interestKeywords"] || {}; // 관심 키워드 바텀 상태
  const brandPLP = sheets["brandPLP"] || {}; // 브랜드 PLP 바텀 상태

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

      {/* PLP 바텀 최소/최대화일 때 채팅창에 애니메이션 적용 */}
      <motion.div
        className="z-10 w-full"
        animate={{
          y: brandPLP.isOpen
            ? brandPLP.isMinimized
              ? "0%" // brandPLP가 최소화되었을 때 y축으로 올라옴 (원래 자리)
              : "100%" // brandPLP 바텀시트가 열렸을 때 y축으로 내려감
            : "0%", // 기본 상태에서 y축 위치
        }}
        initial={false}
        transition={{ type: "tween", duration: 1 }}
      >
        <ChatInput />
      </motion.div>

      {/* 로그인 */}
      {login.isOpen && <LoginBottomSheet />}

      {/* 관심 키워드 */}
      {interestKeywords.isOpen && <InterestKeywordsBottomSheet />}

      {/* PLP */}
      {brandPLP.isOpen && (
        <div className="z-[8]">
          {/* 브랜드 PLP */}
          {clickedBrand && <PLPBottomSheet brandName={clickedBrand} />}
        </div>
      )}
    </div>
  );
};

export default Chat;
