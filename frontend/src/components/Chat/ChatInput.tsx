import Button from "@common/html/Button";
import Input from "@common/html/Input";
import { arrowUpIcon } from "@assets/assets";
import ImageSelectIcon from "@assets/icons/image-select-icon.svg?react";
import { useState } from "react";
import { chatApi } from "@/apis/services/chat";
import useChatStore from "@/store/chat.store";
import { addMessageToFirestore } from "@/apis/firebase/chatFirestore";
import userStore from "@/store/auth.store";

const ChatInput = () => {
  const { addGuestMessage, roomId, addUserMessage } = useChatStore();
  const { user, isLoggedIn } = userStore();
  const [isSending, setIsSending] = useState(false);
  const [chatMsg, setChatMsg] = useState("");

  const userId = user?.uid!;

  const handleSubmit = async () => {
    if (isSending || chatMsg.trim() === "") return;

    setIsSending(true);

    try {
      if (isLoggedIn) {
        addUserMessage({ type: "user", content: chatMsg });
      } else {
        addGuestMessage({ type: "user", content: chatMsg });
      }

      setChatMsg("");

      const res = await chatApi.postChatResponse({
        message: {
          content: chatMsg,
        },
      });

      if (res.status === 200) {
        console.log(res.data);
        if (isLoggedIn) {
          const docId = await addMessageToFirestore(
            userId,
            roomId!,
            chatMsg,
            res.data
          );
          addUserMessage({ type: "bot", content: res.data, id: docId });
        } else {
          addGuestMessage({ type: "bot", content: res.data });
        }
      }
    } catch (error) {
      const errorMessage =
        "예기치 못한 에러가 발생하였습니다. 다시 시도해주세요.";
      if (isLoggedIn) {
        // 호출 실패하면 굳이 firestore에 저장할 필요 없으니 상태 업데이트만 해줌
        addUserMessage({ type: "bot", content: { message: errorMessage } });
      } else {
        addGuestMessage({ type: "bot", content: { message: errorMessage } });
      }
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
    <div className="flex h-28 w-full items-center bg-gray-100 px-4 pb-10 pt-4">
      <div className="mr-2 w-5">
        <ImageSelectIcon stroke="#71717A" />
      </div>
      <div className="flex grow items-center rounded-full border border-gray-300 bg-white">
        <Input
          className="h-12 grow border-none bg-transparent py-3.5 pl-4 pr-1 font-paragraph text-gray-500 outline-none"
          placeholder="궁금한 신발 정보 물어보세요!"
          value={chatMsg}
          onChange={(e) => setChatMsg(e.target.value)}
          onKeyDown={handleKeyDown}
        />

        <Button
          className="mr-1 flex size-10 items-center justify-center rounded-full border-none bg-black"
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
