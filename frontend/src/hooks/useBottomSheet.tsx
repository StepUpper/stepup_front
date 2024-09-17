import { useEffect, useState } from "react";

type UseBottomSheetReturn = {
  isOpen: boolean;
  isMinimized: boolean;
  yPosition: number;
  openSheet: () => void;
  closeSheet: () => void;
  minimizeSheet: () => void;
  maximizeSheet: () => void;
};
const useBottomSheet = (): UseBottomSheetReturn => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false); // 최소화 여부
  const [yPosition, setYPosition] = useState(window.innerHeight); // yPosition 상태

  const minHeight = 40; // 최소화 시 높이

  // 오버레이 스크롤 방지 효과 적용
  useEffect(() => {
    document.body.style.overflow = isOpen && !isMinimized ? "hidden" : "";

    return () => {
      document.body.style.overflow = ""; // 컴포넌트 언마운트 시 스크롤 허용
    };
  }, [isOpen, isMinimized]);

  // 열기
  const openSheet = () => {
    if (isOpen && isMinimized) {
      // 이미 열려 있고, 최소화 상태일 때 최대화 상태로 전환
      maximizeSheet();
    } else {
      // 열려 있지 않다면 열기
      setIsOpen(true);
      setYPosition(0); // 최대화 상태로 열기
    }
  };

  // 닫기
  const closeSheet = () => {
    setIsOpen(false);
    setIsMinimized(false);
    setYPosition(window.innerHeight); // yPosition을 닫힌 상태로 설정
  };

  // 최소화
  const minimizeSheet = () => {
    setIsMinimized(true);
    setYPosition(window.innerHeight - minHeight); // 최소화 상태로 설정
  };

  // 최대화
  const maximizeSheet = () => {
    setIsMinimized(false);
    setYPosition(0); // 최대화 상태로 설정
  };
  return {
    isOpen,
    isMinimized,
    yPosition,
    openSheet,
    closeSheet,
    minimizeSheet,
    maximizeSheet,
  };
};
export default useBottomSheet;
