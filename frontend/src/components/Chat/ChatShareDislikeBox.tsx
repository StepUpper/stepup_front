import { useState } from "react";
import { thumbsDownIcon, shareIcon } from "@assets/assets";
import ChatShareModal from "./ChatShareModal";
import { getMessageById } from "@/apis/firebase/chatFirestore";
import useChatStore from "@/store/chat.store";
import userStore from "@/store/auth.store";
import { TChatResponse } from "@/types/chat";

interface ChatShareDislikeBoxProps {
  docId?: string | null;
}

const ChatShareDislikeBox = (props: ChatShareDislikeBoxProps) => {
  const { docId } = props;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [message, setMessage] = useState<{
    id: string;
    userMessage: string;
    botMessage: TChatResponse;
    timestamp: any;
  }>();
  const { user } = userStore();
  const { roomId } = useChatStore();
  const userId = user?.uid!;

  const openModal = async () => {
    console.log(docId);
    setIsModalOpen(true);
    try {
      const fetchedMessage = await getMessageById(userId, roomId!, docId!);
      if (fetchedMessage) {
        setMessage(fetchedMessage);
        setIsModalOpen(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="flex gap-3 py-3 pl-8">
        <img
          src={shareIcon}
          alt="shareIcon"
          onClick={openModal}
          className="cursor-pointer"
        />
        <img src={thumbsDownIcon} alt="thumbsDownIcon" />
      </div>

      {isModalOpen && <ChatShareModal onClose={closeModal} message={message} />}
    </>
  );
};

export default ChatShareDislikeBox;
