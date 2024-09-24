import { chatListIcon, shareWhiteIcon, trashIcon } from "@/assets/assets";
import Button from "@common/html/Button";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

type sideChatListItemProps = {
  title: string;
  isSwiped: boolean;
  isLongPressed: boolean;
  onSwipe: () => void;
  onLongPress: () => void;
  onReset: () => void;
  onClick: () => void;
};

const SideChatListItem = (props: sideChatListItemProps) => {
  const {
    title,
    isSwiped,
    isLongPressed,
    onSwipe,
    onLongPress,
    onReset,
    onClick,
  } = props;

  const itemRef = useRef<HTMLLIElement>(null);

  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const minSwipeDist = 60; // 스와이프 최소 거리
  const holdTimeRef = useRef<number | null>(null);

  // 스와이프 제스처 인식 후 스와이핑
  const handleSwipeStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleSwipeMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };
  const handleSwipeEnd = () => {
    if (touchStartX.current - touchEndX.current > minSwipeDist) {
      onSwipe();
    } else {
      onReset();
    }
  };

  const handleMouseDown = () => {
    holdTimeRef.current = window.setTimeout(() => {
      onLongPress();
    }, 1000);
  };
  const handleMouseUp = () => {
    if (holdTimeRef.current) {
      clearTimeout(holdTimeRef.current);
    }
  };

  const navigate = useNavigate();
  const gotoPageHandler = (path: string) => {
    if (!isSwiped) {
      navigate(path);
    }
  };

  //리스트 외부 클릭시 리스트 아이템 원위치
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (itemRef.current && !itemRef.current.contains(e.target as Node)) {
        onReset();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [itemRef]);

  return (
    <>
      <li
        ref={itemRef}
        className="flex items-center gap-[8px] overflow-hidden"
        onTouchStart={handleSwipeStart}
        onTouchMove={handleSwipeMove}
        onTouchEnd={handleSwipeEnd}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onClick={(e) => {
          e.preventDefault();
          onClick(); // userId와 roomId는 부모 컴포넌트에서 전달되므로, onClick 함수는 여기서 실행
        }}
      >
        <div
          className={`flex items-center transition-transform ${isSwiped || isLongPressed ? "translate-x-[-92px]" : ""}`}
        >
          <Button
            className="flex gap-[8px]"
            onClick={() => gotoPageHandler("/")}
          >
            <img src={chatListIcon} className="size-[20px]" alt="채팅 아이콘" />
            <span className="w-[240px] truncate text-left text-body2 font-paragraph text-[#3F3F46]">
              {title}
            </span>
          </Button>
          <div className="relative right-0 flex pl-[10px]">
            <Button className="flex h-[34px] w-[45px] items-center justify-center bg-grey-500">
              <img src={shareWhiteIcon} alt="공유" className="size-[24px]" />
            </Button>
            <Button className="flex h-[34px] w-[45px] items-center justify-center bg-red-300">
              <img src={trashIcon} alt="삭제" className="size-[24px]" />
            </Button>
          </div>
        </div>
      </li>
    </>
  );
};
export default SideChatListItem;
