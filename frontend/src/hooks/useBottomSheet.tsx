import { useState } from "react";

type UseBottomSheetReturn = {
  isOpen: boolean;
  handleToggle: () => void;
  handleClose: () => void;
};
const useBottomSheet = (): UseBottomSheetReturn => {
  const [isOpen, setIsOpen] = useState(true);

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
    console.log(isOpen);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return {
    isOpen,
    handleToggle,
    handleClose,
  };
};
export default useBottomSheet;
