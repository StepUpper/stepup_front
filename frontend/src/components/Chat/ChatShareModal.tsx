import { chatCircleIcon, closeIcon, linkAngledIcon } from "@/assets/assets";
import { TChatResponse } from "@/types/chat";
import { useEffect, useRef } from "react";

interface ModalProps {
  onClose: () => void;
  message:
    | {
        id: string;
        userMessage: string;
        botMessage: TChatResponse;
        timestamp: any; // Firebase Timestamp
      }
    | undefined;
}

const ChatShareModal = (props: ModalProps) => {
  const { onClose, message } = props;
  const modalRef = useRef<HTMLDivElement>(null);

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
    console.log(message?.timestamp);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [modalRef, onClose]);

  const formattedDate = message?.timestamp
    ? message.timestamp.toDate
      ? message.timestamp.toDate().toLocaleString()
      : new Date(message.timestamp).toLocaleString()
    : "Invalid date";

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
          onClick={() => {
            navigator.clipboard.writeText("복사된 링크");
          }}
          className="mt-4 flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-black py-2 text-white"
        >
          <img src={linkAngledIcon} alt="linkAngledIcon" className="h-6 w-6" />
          링크 복사
        </button>
      </div>
    </div>
  );
};

export default ChatShareModal;
