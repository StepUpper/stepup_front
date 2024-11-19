import { useEffect, useMemo, useRef, useState } from "react";
import {
  closeIcon,
  copyLeftIcon,
  linkAngledIcon,
  loadingIcon,
} from "@assets/assets";
import formattedDate from "@utils/formattedDate";

interface ShareModalProps {
  id: string;
  icon: string; // 표시 아이콘
  title?: string; // 공유 제목
  desc: string; // 안내 문구 (설명)
  link: string; // 생성 링트
  content: string; // 공유할 내용
  timestamp?: Date; // 시간
  onClose: () => void;
  onSaveData?: ()=> void;
}

const ShareModal = (props: ShareModalProps) => {
  const {
    id,
    icon,
    title = "공개 링크 생성됨",
    desc,
    link,
    content,
    timestamp,
    onClose,
    onSaveData,
  } = props;
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

  // 날짜 포멧
  const formattedTimestamp = useMemo(
    () => formattedDate(timestamp),
    [timestamp]
  );

  // 링크 복사
  const generateShareableLink = async () => {
    setIsCopying(true);
    if(onSaveData) onSaveData()
      
    const baseUrl = `${window.location.origin}/stepup_front`;
    const shareUrl = `${baseUrl}${link}/${id}`;

    await navigator.clipboard.writeText(shareUrl);

    setTimeout(() => {
      setIsCopying(false);
      setIsCopied(true);

      setTimeout(() => {
        setIsCopied(false);
      }, 3000);
    }, 500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div
        ref={modalRef}
        className="relative w-[320px] rounded-lg bg-white p-6 shadow-lg"
      >
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold">{title}</h2>
          <button onClick={onClose} className="text-gray-600">
            <img src={closeIcon} alt="closeIcon" />
          </button>
        </div>
        <p className="mt-2 text-sm text-gray-600">{desc}</p>
        <div className="mt-4 rounded-lg bg-gray-100 p-4">
          <img src={icon} alt="공유 아이콘" className="w-6" />
          <div className="text-base mt-2 font-semibold">{content}</div>
          <div className="mt-2 text-xs text-gray-500">{formattedTimestamp}</div>
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

export default ShareModal;
