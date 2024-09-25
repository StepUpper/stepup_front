import { saveMessageToShareMessages } from "@/apis/firebase/chatFirestore";
import {
  chatCircleIcon,
  closeIcon,
  copyLeftIcon,
  linkAngledIcon,
  loadingIcon,
} from "@/assets/assets";
import { TChatResponse } from "@/types/chat";
import { Timestamp } from "firebase/firestore";
import { useEffect, useRef, useState } from "react";

interface ModalProps {
  onClose: () => void;
  message:
    | {
        id: string;
        userMessage: string;
        botMessage: TChatResponse;
        timestamp: Timestamp;
      }
    | undefined;
}

const ChatShareModal = (props: ModalProps) => {
  const { onClose, message } = props;
  const modalRef = useRef<HTMLDivElement>(null);

  const [isCopying, setIsCopying] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [modalRef, onClose]);

  const formattedDate = message?.timestamp
    ? message.timestamp instanceof Date
      ? message.timestamp.toLocaleDateString("ko-KR", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })
      : message.timestamp.toDate().toLocaleDateString("ko-KR", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })
    : "Invalid date";

  const generateShareableLink = async () => {
    setIsCopying(true);
    saveMessageToShareMessages(message!);
    const baseUrl = `${window.location.origin}/stepup_front`;
    const shareUrl = `${baseUrl}/share/${message?.id}`;

    await navigator.clipboard.writeText(shareUrl);

    setTimeout(() => {
      setIsCopying(false);
      setIsCopied(true);
    }, 500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div
        ref={modalRef}
        className="relative w-[320px] rounded-lg bg-white p-6 shadow-lg"
      >
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold">공개 링크 생성됨</h2>
          <button onClick={onClose} className="text-gray-600">
            <img src={closeIcon} alt="closeIcon" />
          </button>
        </div>
        <p className="mt-2 text-sm text-gray-600">
          채팅의 공개 링크가 생성되었습니다. 공유를 원하는 곳에 어디든지
          전달하실 수 있습니다.
        </p>

        <div className="mt-4 rounded-lg bg-gray-100 p-4">
          <img src={chatCircleIcon} alt="chatCircleIcon" />
          <div className="text-md mt-2 font-semibold">
            {message?.userMessage}
          </div>
          <div className="mt-2 text-xs text-gray-500">{formattedDate}</div>
        </div>

        <button
          onClick={generateShareableLink}
          className={`mt-4 flex h-11 w-full items-center justify-center gap-2 rounded-lg ${
            isCopying || isCopied
              ? "bg-gray-100 text-gray-500"
              : "bg-black text-white"
          } py-2`}
          disabled={isCopying || isCopied}
        >
          <img
            src={
              isCopying ? loadingIcon : isCopied ? copyLeftIcon : linkAngledIcon
            }
            alt={
              isCopying
                ? "loadingIcon"
                : isCopied
                  ? "copyLeftIcon"
                  : "linkAngledIcon"
            }
          />
          {isCopying ? "링크 복사중" : isCopied ? "복사됨" : "링크 복사"}
        </button>
      </div>
    </div>
  );
};

export default ChatShareModal;
