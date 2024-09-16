import Button from "@common/html/Button";
import Input from "@common/html/Input";
import { imageSelectIcon, arrowUpIcon } from "@assets/assets";
import { useState } from "react";
import { chatApi } from "@/apis/services/chat";
import useChatStore from "@/store/useChatStore";

const ChatInput = () => {
  const { addMessage } = useChatStore();
  const [isSending, setIsSending] = useState(false);
  const [chatMsg, setChatMsg] = useState("");

  const handleSubmit = async () => {
    if (isSending || chatMsg.trim() === "") return;
    addMessage({ type: "user", content: chatMsg });
    setChatMsg("");
    setIsSending(true);

    try {
      const res = await chatApi.postChatResponse({
        message: {
          content: chatMsg,
        },
      });

      if (res.status === 200) {
        console.log(res.data);
        addMessage({ type: "bot", content: res.data });
      }
    } catch (error) {
      addMessage({
        type: "bot",
        content: {
          message:
            "예기치 못한 에러가 발생하였습니다. 다시 한번 채팅을 시도해주세요",
        },
      });
    } finally {
      setIsSending(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !isSending) {
      handleSubmit();
    }
  };

  return (
    <div className="flex h-28 w-full items-center bg-gray-100 pb-10 pl-4 pr-4 pt-4">
      <img src={imageSelectIcon} alt="imageSelectIcon" className="mr-2 w-5" />

      <div className="flex flex-grow items-center rounded-full border border-gray-300 bg-white">
        <Input
          className="h-12 flex-grow border-none bg-transparent pb-3.5 pl-4 pr-1 pt-3.5 font-paragraph text-gray-500 outline-none"
          placeholder="궁금한 신발 정보 물어보세요!"
          value={chatMsg}
          onChange={(e) => setChatMsg(e.target.value)}
          onKeyDown={handleKeyDown}
        />

        <Button
          className="mr-1 flex h-10 w-10 items-center justify-center rounded-full border-none bg-black"
          onClick={handleSubmit}
          disabled={isSending}
        >
          <img src={arrowUpIcon} alt="arrowUpIcon" className="w-6 text-white" />
        </Button>
      </div>
    </div>
  );
};

export default ChatInput;
