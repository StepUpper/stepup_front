import { ReactNode, useEffect, useRef, useState } from "react";
import { motion, useDragControls } from "framer-motion";
import { grabber } from "@assets/assets";

interface BottomSheetProps {
  isDragBar: boolean;
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const BottomSheet = (props: BottomSheetProps) => {
  const { isDragBar = true, isOpen, onClose, children } = props;
  const bottomSheetRef = useRef<HTMLDivElement | null>(null);

  // TODO: 바텀 시트가 다 올라왔을 때 위로 올라오지 않도록 제한
  // 드래그 제한 설정을 위한 상태
  const [dragConstraints, setDragConstraints] = useState({ top: 0, bottom: 0 });

  const dragControls = useDragControls();

  // 오버레이 스크롤 방지 효과 적용
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"; // 스크롤 방지
    } else {
      document.body.style.overflow = ""; // 스크롤 허용
    }

    return () => {
      document.body.style.overflow = ""; // 컴포넌트 언마운트 시 스크롤 허용
    };
  }, [isOpen]);

  // TODO: 스냅 애니메이션 추가

  return (
    <div>
      {/* 오버레이 */}
      {isOpen && <Overlay />}
      {/* 바텀시트 본체 */}
      <motion.div
        ref={bottomSheetRef}
        initial={{ y: "100%" }} // 초기값
        animate={{ y: isOpen ? "0%" : "100%" }}
        transition={{ duration: 0.5, ease: "easeInOut" }} // 부드럽게
        drag="y"
        dragControls={dragControls}
        dragConstraints={dragConstraints} // 드래그 범위
        dragListener={false}
        className="fixed bottom-0 left-0 flex max-h-[98vh] w-full flex-col overflow-hidden rounded-t-3xl bg-white shadow-custom"
      >
        {/* 드래그 바 */}
        {isDragBar && (
          <motion.div
            className="item-center w-full cursor-pointer flex-col pt-2"
            onPointerDown={(e) => dragControls.start(e)}
            onTap={onClose}
          >
            <img src={grabber} alt="드래그 바" />
          </motion.div>
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

BottomSheet.Header = BottomSheetHeader;
BottomSheet.Content = BottomSheetContent;

const Overlay = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.5 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black"
    ></motion.div>
  );
};
