import { chatListIcon, shareWhiteIcon, trashIcon } from "@/assets/assets";
import Button from "@common/html/Button";
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

const SideChatListItem = () => {
  const [isSwiped, setIsSwiped] = useState(false);
  const [isSwiping, setIsSwiping] = useState(false);
  const itemRef = useRef<HTMLLIElement>(null);

  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const minSwipeDist = 50;

  const handleReset = () => {
    setIsSwiping(false);
    setIsSwiped(false);
  };
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    setIsSwiping(false);
  };
  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
    if (touchStartX.current - touchEndX.current > minSwipeDist) {
      setIsSwiped(true);
      setIsSwiping(true);
    }
  };
  const handleTouchEnd = () => {
    if (!isSwiping) {
      setIsSwiping(false);
    }
  };

  const navigate = useNavigate();
  const gotoPageHandler = (path: string) => {
    if (!isSwiping) {
      navigate(path);
    }
  };

  //리스트 외부 클릭시 리스트 아이템 원위치
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (itemRef.current && !itemRef.current.contains(e.target as Node)) {
        handleReset();
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
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className={`flex items-center transition-transform ${isSwiped ? "translate-x-[-92px]" : ""}`}
        >
          <Button
            className="flex gap-[8px]"
            //onClick={() => gotoPageHandler("/")}
          >
            <img src={chatListIcon} className="size-[20px]" alt="채팅 아이콘" />
            <span className="w-[240px] truncate text-left text-body2 font-paragraph text-[#3F3F46]">
              비오는 날 신기 좋은 레인부츠 브랜드 추천
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
