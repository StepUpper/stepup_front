import { ReactNode } from "react";
import { motion } from "framer-motion";
import { grabber } from "@assets/assets";

interface BottomSheetProps {
  isDragBar: boolean;
  isOpen: boolean;
  handleToggle?: () => void;
  handleClose?: () => void;
  children: ReactNode;
}

const BottomSheet = (props: BottomSheetProps) => {
  const { isDragBar = true, isOpen, handleClose, children } = props;

  // TODO:
  // 1. 버튼 클릭 시 바텀 시트가 올라옴 / 오버레이 클릭시 닫음
  // 2. 드래그 중 바텀 시트가 움직임
  // 3. 드래그 종료 후 스냅 애니메이션
  // 4. 내릴 때 헤더 바까지만 보임

  return (
    <div>
      {/* 오버레이 */}
      {isOpen && <Overlay onClick={handleClose} />}
      {/* 바텀시트 본체 */}
      <motion.div
        initial={{ y: "100%" }} // 초기값
        animate={{ y: isOpen ? "0%" : "100%" }}
        transition={{ duration: 0.5, ease: "easeInOut" }} // 부드럽게
        className="fixed bottom-0 left-0 flex max-h-[98vh] w-full flex-col overflow-hidden rounded-t-3xl bg-white shadow-custom"
      >
        {/* 드래그 바 */}
        {isDragBar && (
          <div className="item-center w-full cursor-pointer flex-col pt-2">
            <img src={grabber} alt="드래그 바" />
          </div>
        )}

        {/* 헤더 / 콘텐츠 영역 */}
        {children}
      </motion.div>
    </div>
  );
};
export default BottomSheet;

const BottomSheetHeader = ({ children }: { children: ReactNode }) => {
  return <div className="flex w-full p-4">{children}</div>;
};

const BottomSheetContent = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex w-full flex-col overflow-y-auto px-4">{children}</div>
  );
};

const Overlay = ({ onClick }: { onClick?: () => void }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.5 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-10"
      onClick={onClick}
    ></motion.div>
  );
};

BottomSheet.Header = BottomSheetHeader;
BottomSheet.Content = BottomSheetContent;
