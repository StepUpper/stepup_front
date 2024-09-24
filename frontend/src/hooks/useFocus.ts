import { DropDownRef } from "@/components/common/html/DropDown";
import { useRef, useCallback, useEffect } from "react";

const useFocus = <T extends HTMLElement | DropDownRef>(
  autoFocus = false
): [
  React.RefObject<T>,
  () => void,
  (e: React.KeyboardEvent, nextFocus: () => void) => void,
] => {
  const elementRef = useRef<T>(null);

  const setFocus = useCallback(() => {
    if (elementRef.current) elementRef.current.focus();
  }, []);

  // 컴포넌트 마운트 시 자동으로 포커스
  useEffect(() => {
    if (autoFocus) {
      setFocus();
    }
  }, [autoFocus, setFocus]);

  // Enter 키를 누르면 다음 필드로 포커스 이동
  const handleKeyPress = useCallback(
    (e: React.KeyboardEvent, nextFocus: () => void) => {
      if (e.key === "Enter") {
        e.preventDefault();
        nextFocus();
      }
    },
    []
  );

  return [elementRef, setFocus, handleKeyPress];
};

export default useFocus;
