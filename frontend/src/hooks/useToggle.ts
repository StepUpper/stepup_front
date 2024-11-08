import { useState } from "react";

const useToggle = (initialState = false) => {
  const [isOpen, setIsOpen] = useState(initialState);

  const open = () => setIsOpen(true); // 모달 열기
  const close = () => setIsOpen(false); // 모달 닫기
  const toggle = () => setIsOpen((prev) => !prev); // 토글

  return {
    isOpen,
    open,
    close,
    toggle,
  };
};
export default useToggle;
