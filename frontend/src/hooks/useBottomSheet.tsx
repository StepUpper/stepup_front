import { useState } from "react";

type UseBottomSheetReturn = {
  isOpen: boolean;
  openSheet: () => void;
  closeSheet: () => void;
};
const useBottomSheet = (): UseBottomSheetReturn => {
  const [isOpen, setIsOpen] = useState(false);

  const openSheet = () => setIsOpen(true);
  const closeSheet = () => setIsOpen(false);

  return {
    isOpen,
    openSheet,
    closeSheet,
  };
};
export default useBottomSheet;
