import { useState } from "react";
import { thumbsDownIcon, shareIcon, chatListIcon } from "@assets/assets";
import {
  getMessageById,
  saveMessageToShareMessages,
} from "@/apis/firebase/chatFirestore";
import useChatStore from "@/store/chat.store";
import userStore from "@/store/auth.store";
import { TChatResponse } from "@/types/chat";
import { Timestamp } from "firebase/firestore";
import ShareModal from "@common/ShareModal";
import useToggle from "@hooks/useToggle";

interface ChatShareDislikeBoxProps {
  docId?: string | null;
}

const ChatShareDislikeBox = (props: ChatShareDislikeBoxProps) => {
  const { docId } = props;
  const {
    isOpen: isModalOpen,
    open: openModal,
    close: closeModal,
  } = useToggle();
  const [message, setMessage] = useState<{
    id: string;
    userMessage: string;
    botMessage: TChatResponse;
    timestamp: Timestamp;
  }>();
  const { user } = userStore();
  const { roomId } = useChatStore();
  const userId = user?.uid!;

  const handleOpenModal = async () => {
    if (user) {
      try {
        const fetchedMessage = await getMessageById(userId, roomId!, docId!);
        if (fetchedMessage) {
          setMessage(fetchedMessage);
          openModal();
        }
      } catch (error) {
        console.error(error);
      }
    } else {
      console.log("로그인 해야 모달창이 열린단다");
    }
  };

  const handleSaveShareMessage = () => {
    saveMessageToShareMessages(message!);
  };

  return (
    <>
      <div className="flex gap-3 py-3 pl-8">
        <img
          src={shareIcon}
          alt="shareIcon"
          onClick={handleOpenModal}
          className="cursor-pointer"
        />
        <img src={thumbsDownIcon} alt="thumbsDownIcon" />
      </div>

      {isModalOpen && message && (
        <ShareModal
          icon={chatListIcon}
          id={message.id}
          desc="채팅의 공개 링크가 생성되었습니다. 공유를 원하는 곳에 어디든지
          전달하실 수 있습니다."
          link="/share"
          content={message.userMessage}
          timestamp={
            message.timestamp instanceof Date
              ? message.timestamp
              : message.timestamp.toDate()
          }
          onClose={closeModal}
          onSaveData={handleSaveShareMessage}
        />
      )}
    </>
  );
};

export default ChatShareDislikeBox;
