import { useEffect, useLayoutEffect, useRef } from "react";
import { motion } from "framer-motion";
import ChatInput from "@components/Chat/ChatInput";
import ChatMessage from "@components/Chat/ChatMessage";
import ChatUserMessage from "@components/Chat/ChatUserMessage";
import Header from "@common/Header";
import { TChatResponse } from "@type/chat";
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
  const { clickedProducts, clickedBrand, setClickedProducts, setClickedBrand } =
    productAndBrandStore();

  const { isLoggedIn, user } = userStore();

  const { sheets, open } = useBottomSheet();
  const login = sheets["login"] || {}; // 로그인/회원가입 바텀 상태
  const interestKeywords = sheets["interestKeywords"] || {}; // 관심 키워드 바텀 상태
  const plp = sheets["plp"] || {}; // 브랜드 PLP 바텀 상태
  const isAllSheetsOpen = Object.values(sheets).some((sheet) => sheet.isOpen);

  const userId = user?.uid!;

  // TODO: 현재 바텀시트 상태 체크용 제거 예정
  useEffect(() => {
    console.log("현재 바텀시트 상태:", sheets);
  }, [sheets]);

  // 브릿지>고객사 이동 후 뒤로가기 시 세션에서 바텀 상태를 복원(유지)
  useEffect(() => {
    const savedState = sessionStorage.getItem("BottomSheetState");
    if (savedState) {
      try {
        const response = JSON.parse(savedState);
        if (response.sheets.plp?.isOpen === true) {
          open("plp");
          if (response.type === "brand") {
            setClickedBrand(response.data);
          } else if (response.type === "product") {
            setClickedProducts(response.data);
          }
        }
      } catch (error) {
        console.error(
          "Error parsing BottomSheetState from sessionStorage:",
          error
        );
      } finally {
        sessionStorage.removeItem("BottomSheetState");
      }
    }
  }, []);

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
    // 바텀 오픈 X 일 경우
    if (!isAllSheetsOpen) {
      setTimeout(() => {
        messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 0);
    }
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
              <ChatMessage
                title={msg.content as TChatResponse}
                docId={msg.id}
              />
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
          y: plp.isOpen
            ? plp.isMinimized
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
      {plp.isOpen && (
        <div className="z-[8]">
          {/* 브랜드 PLP */}
          {(clickedBrand || clickedProducts) && (
            <PLPBottomSheet
              brandName={clickedBrand}
              products={clickedProducts}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default Chat;
