import ChatInput from "@components/Chat/ChatInput";
import ChatMessage from "@components/Chat/ChatMessage";
import ChatUserMessage from "@components/Chat/ChatUserMessage";
import Header from "@common/Header";

const Chat = () => {
  // UI 테스트용
  return (
    <>
      <div className="flex h-screen flex-col">
        <Header type="menu" />
        <main className="flex-1 overflow-y-auto">
          <ChatUserMessage title="비 오는날 신을 신발 추천해줘" />
          <ChatMessage title="추천상품입니다. 추천상품입니다. 추천상품입니다. 추천상품입니다." />
          <ChatUserMessage title="비 오는날 신을 신발 추천해줘" />
          <ChatMessage title="추천상품입니다. 추천상품입니다. 추천상품입니다. 추천상품입니다." />
          <ChatUserMessage title="비 오는날 신을 신발 추천해줘" />
          <ChatMessage title="추천상품입니다. 추천상품입니다. 추천상품입니다. 추천상품입니다." />
          <ChatUserMessage title="비 오는날 신을 신발 추천해줘" />
          <ChatMessage title="추천상품입니다. 추천상품입니다. 추천상품입니다. 추천상품입니다." />
        </main>
        <ChatInput />
      </div>
    </>
  );
};
export default Chat;
